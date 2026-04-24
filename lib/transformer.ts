// @ts-nocheck
import * as fs from "node:fs/promises";
import * as path from "node:path";

import { format } from "oxfmt";
import * as webidl from "webidl2";

import CallbackFunction from "./constructs/callback-function.ts";
import CallbackInterface from "./constructs/callback-interface.ts";
import Dictionary from "./constructs/dictionary.ts";
import Enumeration from "./constructs/enumeration.ts";
import Interface from "./constructs/interface.ts";
import InterfaceMixin from "./constructs/interface-mixin.ts";
import Typedef from "./constructs/typedef.ts";
import Context from "./context.ts";

const outputUtilsUrls = [
  new URL("./output/utils.ts", import.meta.url),
  new URL("./output/utils.js", import.meta.url)
];

function withLeadingDot(specifier) {
  return specifier.startsWith(".") ? specifier : `./${specifier}`;
}

function ensureTsExtension(specifier) {
  if (!specifier.startsWith(".")) {
    return specifier;
  }
  if (specifier.endsWith(".ts")) {
    return specifier;
  }
  if (specifier.endsWith(".js")) {
    return `${specifier.slice(0, -3)}.ts`;
  }
  return `${specifier}.ts`;
}

function convertRequireLine(_, bindings, rawSpecifier, propertyAccess = "") {
  const specifier = ensureTsExtension(rawSpecifier);
  if (bindings.startsWith("{")) {
    return `import ${bindings} from ${JSON.stringify(specifier)};`;
  }
  if (propertyAccess) {
    const imported = propertyAccess.slice(1);
    return `import { ${imported} as ${bindings} } from ${JSON.stringify(specifier)};`;
  }
  return `import * as ${bindings} from ${JSON.stringify(specifier)};`;
}

function transformCommonJsToTypeScript(source) {
  let transformed = source.replace(/^[ \t]*"use strict";\s*/m, "").trim();
  const aliasedExports = [];

  transformed = transformed.replace(
    /^\s*const\s+(\{[^}]+\}|[A-Za-z_$][\w$]*)\s*=\s*require\((['"])(.+?)\2\)(\.[A-Za-z_$][\w$]*)?;\s*$/gm,
    (_, bindings, _quote, specifier, propertyAccess = "") => convertRequireLine(_, bindings, specifier, propertyAccess)
  );

  transformed = transformed.replace(/module\.exports\s*=\s*exports\s*=\s*/g, "export default ");
  transformed = transformed.replace(/module\.exports\s*=\s*/g, "export default ");
  transformed = transformed.replace(/exports\.([A-Za-z_$][\w$]*)\s*=\s*/g, (_, exportName) => {
    if (exportName === "new") {
      aliasedExports.push("new");
      return "const webidl2jsNew = ";
    }
    return `export const ${exportName} = `;
  });
  transformed = transformed.replace(/\bexports\.([A-Za-z_$][\w$]*)/g, "$1");

  if (aliasedExports.includes("new")) {
    transformed += "\nexport { webidl2jsNew as new };\n";
  }

  return `// @ts-nocheck\n${transformed}\n`;
}

function createStubImplementationSource() {
  return `
    const Impl = {
      implementation: class {
        constructor(constructorArgs, privateData = {}) {
          void constructorArgs;
          Object.assign(this, privateData);
        }
      }
    };
  `;
}

async function readOutputUtilsModule() {
  for (const url of outputUtilsUrls) {
    try {
      return await fs.readFile(url, { encoding: "utf-8" });
    } catch (error) {
      if (error && error.code === "ENOENT") {
        continue;
      }
      throw error;
    }
  }
  throw new Error("Unable to locate output/utils module");
}

export default class Transformer {
  constructor(opts = {}) {
    this.ctx = new Context({
      implSuffix: opts.implSuffix,
      processCEReactions: opts.processCEReactions,
      processHTMLConstructor: opts.processHTMLConstructor,
      processReflect: opts.processReflect,
      options: {
        suppressErrors: Boolean(opts.suppressErrors)
      }
    });

    this.sources = [];
    this.utilPath = null;
  }

  addSource(idl, impl = null) {
    if (typeof idl !== "string") {
      throw new TypeError("idl path has to be a string");
    }
    if (impl !== null && impl !== undefined && typeof impl !== "string") {
      throw new TypeError("impl path has to be a string");
    }
    this.sources.push({
      idlPath: path.resolve(idl),
      impl: impl === null || impl === undefined ? null : path.resolve(impl)
    });
    return this;
  }

  async _collectSources() {
    const stats = await Promise.all(this.sources.map(src => fs.stat(src.idlPath)));
    const dirContents = await Promise.all(
      stats.map((stat, i) => (stat.isDirectory() ? fs.readdir(this.sources[i].idlPath) : null))
    );

    const files = [];
    for (let i = 0; i < stats.length; ++i) {
      if (dirContents[i]) {
        for (const file of dirContents[i]) {
          if (file.endsWith(".webidl")) {
            files.push({
              idlPath: path.join(this.sources[i].idlPath, file),
              impl: this.sources[i].impl
            });
          }
        }
      } else {
        files.push({
          idlPath: this.sources[i].idlPath,
          impl: this.sources[i].impl
        });
      }
    }
    return files;
  }

  async _readFiles(files) {
    const fileContents = await Promise.all(files.map(file => fs.readFile(file.idlPath, { encoding: "utf-8" })));
    return files.map((file, index) => ({
      idlContent: fileContents[index],
      impl: file.impl
    }));
  }

  _parse(outputDir, contents) {
    const parsed = contents.map(content => ({
      idl: webidl.parse(content.idlContent),
      impl: content.impl
    }));

    this.ctx.initialize();
    const {
      interfaces,
      interfaceMixins,
      callbackInterfaces,
      callbackFunctions,
      dictionaries,
      enumerations,
      typedefs
    } = this.ctx;

    for (const file of parsed) {
      for (const instruction of file.idl) {
        let obj;
        switch (instruction.type) {
          case "interface":
            if (instruction.partial) {
              break;
            }
            obj = new Interface(this.ctx, instruction, { implDir: file.impl });
            interfaces.set(obj.name, obj);
            break;
          case "interface mixin":
            if (instruction.partial) {
              break;
            }
            obj = new InterfaceMixin(this.ctx, instruction);
            interfaceMixins.set(obj.name, obj);
            break;
          case "callback interface":
            obj = new CallbackInterface(this.ctx, instruction);
            callbackInterfaces.set(obj.name, obj);
            break;
          case "callback":
            obj = new CallbackFunction(this.ctx, instruction);
            callbackFunctions.set(obj.name, obj);
            break;
          case "includes":
            break;
          case "dictionary":
            if (instruction.partial) {
              break;
            }
            obj = new Dictionary(this.ctx, instruction);
            dictionaries.set(obj.name, obj);
            break;
          case "enum":
            obj = new Enumeration(this.ctx, instruction);
            enumerations.set(obj.name, obj);
            break;
          case "typedef":
            obj = new Typedef(this.ctx, instruction);
            typedefs.set(obj.name, obj);
            break;
          default:
            if (!this.ctx.options.suppressErrors) {
              throw new Error(`Can't convert type '${instruction.type}'`);
            }
        }
      }
    }

    for (const file of parsed) {
      for (const instruction of file.idl) {
        let oldMembers;
        let extAttrs;
        switch (instruction.type) {
          case "interface":
            if (!instruction.partial) {
              break;
            }
            if (this.ctx.options.suppressErrors && !interfaces.has(instruction.name)) {
              break;
            }
            oldMembers = interfaces.get(instruction.name).idl.members;
            oldMembers.push(...instruction.members);
            extAttrs = interfaces.get(instruction.name).idl.extAttrs;
            extAttrs.push(...instruction.extAttrs);
            break;
          case "interface mixin":
            if (!instruction.partial) {
              break;
            }
            if (this.ctx.options.suppressErrors && !interfaceMixins.has(instruction.name)) {
              break;
            }
            oldMembers = interfaceMixins.get(instruction.name).idl.members;
            oldMembers.push(...instruction.members);
            extAttrs = interfaceMixins.get(instruction.name).idl.extAttrs;
            extAttrs.push(...instruction.extAttrs);
            break;
          case "dictionary":
            if (!instruction.partial) {
              break;
            }
            if (this.ctx.options.suppressErrors && !dictionaries.has(instruction.name)) {
              break;
            }
            oldMembers = dictionaries.get(instruction.name).idl.members;
            oldMembers.push(...instruction.members);
            extAttrs = dictionaries.get(instruction.name).idl.extAttrs;
            extAttrs.push(...instruction.extAttrs);
            break;
          case "includes":
            if (this.ctx.options.suppressErrors && !interfaces.has(instruction.target)) {
              break;
            }
            interfaces.get(instruction.target).includes(instruction.includes);
            break;
        }
      }
    }
  }

  async _writeFiles(outputDir) {
    const utilsText = await readOutputUtilsModule();
    await fs.writeFile(this.utilPath, utilsText);

    const { interfaces, callbackInterfaces, callbackFunctions, dictionaries, enumerations } = this.ctx;

    let relativeUtils = path.relative(outputDir, this.utilPath).replaceAll("\\", "/");
    relativeUtils = ensureTsExtension(withLeadingDot(relativeUtils));

    await Promise.all(
      [...interfaces.values()].map(async obj => {
        let source = obj.toString();
        let implSource = createStubImplementationSource();

        if (obj.opts.implDir) {
          const absoluteImplPath = path.resolve(obj.opts.implDir, obj.name + this.ctx.implSuffix);
          try {
            await fs.access(`${absoluteImplPath}.ts`);
            let implFile = path.relative(outputDir, absoluteImplPath).replaceAll("\\", "/");
            implFile = ensureTsExtension(withLeadingDot(implFile));
            implSource = `const Impl = require(${JSON.stringify(implFile)});`;
          } catch (error) {
            if (!error || error.code !== "ENOENT") {
              throw error;
            }
          }
        }

        source = `
          const conversions = require("webidl-conversions");
          const utils = require(${JSON.stringify(relativeUtils)});
          ${source}
          ${implSource}
        `;

        source = transformCommonJsToTypeScript(source);
        source = await this._prettify(source);
        await fs.writeFile(path.join(outputDir, `${obj.name}.ts`), source);
      })
    );

    await Promise.all(
      [...callbackInterfaces.values(), ...callbackFunctions.values(), ...dictionaries.values()].map(async obj => {
        let source = obj.toString();
        source = `
          const conversions = require("webidl-conversions");
          const utils = require(${JSON.stringify(relativeUtils)});
          ${source}
        `;

        source = transformCommonJsToTypeScript(source);
        source = await this._prettify(source);
        await fs.writeFile(path.join(outputDir, `${obj.name}.ts`), source);
      })
    );

    await Promise.all(
      [...enumerations.values()].map(async obj => {
        let source = transformCommonJsToTypeScript(obj.toString());
        source = await this._prettify(source);
        await fs.writeFile(path.join(outputDir, `${obj.name}.ts`), source);
      })
    );
  }

  async _prettify(source) {
    const { code } = await format("output.ts", source, {
      printWidth: 120,
      trailingComma: "none",
      arrowParens: "avoid"
    });
    return code;
  }

  async generate(outputDir) {
    await fs.mkdir(outputDir, { recursive: true });

    if (!this.utilPath) {
      this.utilPath = path.join(outputDir, "utils.ts");
    }

    const sources = await this._collectSources();
    const contents = await this._readFiles(sources);
    this._parse(outputDir, contents);
    await this._writeFiles(outputDir);
  }
}
