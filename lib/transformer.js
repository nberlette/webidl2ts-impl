import { format } from "oxfmt";
import { parse } from "webidl2";
import fs from "node:fs/promises";
import path from "node:path";

const builtinIdl = parse(`
  typedef (Int8Array or Int16Array or Int32Array or
           Uint8Array or Uint16Array or Uint32Array or Uint8ClampedArray or
           Float32Array or Float64Array or DataView) ArrayBufferView;
  typedef (ArrayBufferView or ArrayBuffer) BufferSource;
  typedef (ArrayBuffer or SharedArrayBuffer or [AllowShared] ArrayBufferView) AllowSharedBufferSource;
  typedef unsigned long long DOMTimeStamp;

  callback Function = any (any... arguments);
  callback VoidFunction = undefined ();
`);

const primitiveTypeMap = new Map([
  ["any", "unknown"],
  ["void", "void"],
  ["undefined", "void"],
  ["boolean", "boolean"],
  ["byte", "number"],
  ["octet", "number"],
  ["short", "number"],
  ["unsigned short", "number"],
  ["long", "number"],
  ["unsigned long", "number"],
  ["long long", "number"],
  ["unsigned long long", "number"],
  ["float", "number"],
  ["unrestricted float", "number"],
  ["double", "number"],
  ["unrestricted double", "number"],
  ["DOMString", "string"],
  ["ByteString", "string"],
  ["USVString", "string"],
  ["object", "object"],
  ["symbol", "symbol"],
  ["bigint", "bigint"],
  ["Error", "Error"]
]);

const unresolvedFallbackTypes = new Set([
  "ArrayBuffer",
  "AsyncIterableIterator",
  "AsyncIterator",
  "DataView",
  "Float32Array",
  "Float64Array",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "IterableIterator",
  "Promise",
  "ReadonlyArray",
  "Record",
  "SharedArrayBuffer",
  "Uint16Array",
  "Uint32Array",
  "Uint8Array",
  "Uint8ClampedArray"
]);

const reservedIdentifiers = new Set([
  "arguments",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield"
]);

const emittedKinds = [
  "typedefs",
  "callbackFunctions",
  "enumerations",
  "dictionaries",
  "interfaceMixins",
  "callbackInterfaces",
  "interfaces"
];

function isIdentifierName(value) {
  return /^[A-Za-z_$][\w$]*$/u.test(value);
}

function toBindingName(value) {
  if (isIdentifierName(value) && !reservedIdentifiers.has(value)) {
    return value;
  }
  return `_${value.replaceAll(/[^A-Za-z0-9_$]/gu, "_")}`;
}

function toMemberName(value) {
  return isIdentifierName(value) ? value : JSON.stringify(value);
}

function toLiteral(value) {
  switch (value.type) {
    case "boolean":
    case "number":
      return String(value.value);
    case "string":
      return JSON.stringify(value.value);
    case "Infinity":
      return "number";
    case "NaN":
      return "number";
    case "null":
      return "null";
    case "sequence":
      return "[]";
    case "dictionary":
      return "{}";
    default:
      return "unknown";
  }
}

function clone(node) {
  return JSON.parse(JSON.stringify(node));
}

function hasExtAttr(extAttrs, name) {
  return (extAttrs ?? []).some(extAttr => extAttr.name === name);
}

function createRegistry() {
  return {
    typedefs: new Map(),
    interfaces: new Map(),
    interfaceMixins: new Map(),
    callbackInterfaces: new Map(),
    callbackFunctions: new Map(),
    dictionaries: new Map(),
    enumerations: new Map(),
    includes: new Map(),
    order: []
  };
}

function getMapKey(type) {
  switch (type) {
    case "typedef":
      return "typedefs";
    case "interface":
      return "interfaces";
    case "interface mixin":
      return "interfaceMixins";
    case "callback interface":
      return "callbackInterfaces";
    case "callback":
      return "callbackFunctions";
    case "dictionary":
      return "dictionaries";
    case "enum":
      return "enumerations";
    default:
      return null;
  }
}

function upsertDefinition(map, rootType) {
  const existing = map.get(rootType.name);
  if (!existing) {
    const node = clone(rootType);
    node.members ??= [];
    node.extAttrs ??= [];
    map.set(rootType.name, node);
    return node;
  }

  if (!rootType.partial) {
    const extAttrs = rootType.extAttrs ?? [];
    existing.inheritance = rootType.inheritance ?? existing.inheritance;
    existing.idlType = rootType.idlType ?? existing.idlType;
    existing.arguments = rootType.arguments ?? existing.arguments;
    existing.values = rootType.values ?? existing.values;
    existing.extAttrs = [...existing.extAttrs, ...extAttrs];
  }

  if (rootType.members) {
    existing.members ??= [];
    existing.members.push(...clone(rootType.members));
  }
  if (rootType.values) {
    existing.values = clone(rootType.values);
  }

  return existing;
}

function registerDefinition(registry, rootType) {
  const key = getMapKey(rootType.type);
  if (key === null) {
    return;
  }

  const map = registry[key];
  if (!map.has(rootType.name)) {
    registry.order.push({ key, name: rootType.name });
  }
  upsertDefinition(map, rootType);
}

function applyIncludes(registry, target, mixinName) {
  if (!registry.includes.has(target)) {
    registry.includes.set(target, new Set());
  }
  registry.includes.get(target).add(mixinName);
}

function generatedTypeNames(registry) {
  const names = new Set();
  for (const kind of emittedKinds) {
    for (const name of registry[kind].keys()) {
      names.add(name);
    }
  }
  return names;
}

function collectUnresolvedName(name, refs) {
  if (primitiveTypeMap.has(name) || unresolvedFallbackTypes.has(name)) {
    return;
  }
  refs.add(name);
}

function collectReferencesFromIdlType(idlType, generatedNames, refs) {
  if (!idlType) {
    return;
  }
  if (typeof idlType.idlType === "string") {
    collectUnresolvedName(idlType.idlType, refs);
    return;
  }
  const nested = Array.isArray(idlType.idlType) ? idlType.idlType : [idlType.idlType];
  for (const child of nested) {
    collectReferencesFromIdlType(child, generatedNames, refs);
  }
}

function collectMemberReferences(member, generatedNames, refs) {
  switch (member.type) {
    case "attribute":
    case "const":
      collectReferencesFromIdlType(member.idlType, generatedNames, refs);
      break;
    case "operation":
      collectReferencesFromIdlType(member.idlType, generatedNames, refs);
      for (const argument of member.arguments ?? []) {
        collectReferencesFromIdlType(argument.idlType, generatedNames, refs);
      }
      break;
    case "constructor":
      for (const argument of member.arguments ?? []) {
        collectReferencesFromIdlType(argument.idlType, generatedNames, refs);
      }
      break;
    case "iterable":
      for (const idlType of member.idlType ?? []) {
        collectReferencesFromIdlType(idlType, generatedNames, refs);
      }
      for (const argument of member.arguments ?? []) {
        collectReferencesFromIdlType(argument.idlType, generatedNames, refs);
      }
      break;
    case "field":
      collectReferencesFromIdlType(member.idlType, generatedNames, refs);
      break;
  }
}

function collectReferencesForDefinition(kind, definition, registry, generatedNames) {
  const generatedRefs = new Set();
  const unresolvedRefs = new Set();

  function track(name) {
    if (generatedNames.has(name)) {
      generatedRefs.add(name);
      return;
    }
    collectUnresolvedName(name, unresolvedRefs);
  }

  const refs = { add: track };

  if (kind === "typedefs") {
    collectReferencesFromIdlType(definition.idlType, generatedNames, refs);
  } else if (kind === "callbackFunctions") {
    collectReferencesFromIdlType(definition.idlType, generatedNames, refs);
    for (const argument of definition.arguments ?? []) {
      collectReferencesFromIdlType(argument.idlType, generatedNames, refs);
    }
  } else if (kind === "enumerations") {
    // no-op
  } else if (kind === "dictionaries") {
    if (definition.inheritance) {
      track(definition.inheritance);
    }
    for (const member of definition.members ?? []) {
      collectMemberReferences(member, generatedNames, refs);
    }
  } else {
    if (definition.inheritance) {
      track(definition.inheritance);
    }
    for (const mixinName of registry.includes.get(definition.name) ?? []) {
      track(mixinName);
    }
    for (const member of definition.members ?? []) {
      collectMemberReferences(member, generatedNames, refs);
    }
  }

  generatedRefs.delete(definition.name);
  unresolvedRefs.delete(definition.name);
  return { generatedRefs, unresolvedRefs };
}

function appendNull(typeText, nullable) {
  if (!nullable) {
    return typeText;
  }
  if (typeText.includes("null")) {
    return typeText;
  }
  return `${typeText} | null`;
}

function uniqueTypes(types) {
  return [...new Set(types.flatMap(type => type.split(" | ").map(part => part.trim())))].join(" | ");
}

function idlTypeToTs(idlType, generatedNames) {
  if (!idlType) {
    return "void";
  }

  if (idlType.union) {
    const unionTypes = idlType.idlType.map(type => idlTypeToTs(type, generatedNames));
    return appendNull(uniqueTypes(unionTypes), idlType.nullable);
  }

  if (idlType.generic) {
    const subtypes = Array.isArray(idlType.idlType) ? idlType.idlType : [idlType.idlType];
    const mappedSubtypes = subtypes.map(type => idlTypeToTs(type, generatedNames));
    let typeText;
    switch (idlType.generic) {
      case "sequence":
        typeText = `Array<${mappedSubtypes[0]}>`;
        break;
      case "FrozenArray":
        typeText = `ReadonlyArray<${mappedSubtypes[0]}>`;
        break;
      case "record":
        typeText = `Record<${mappedSubtypes[0]}, ${mappedSubtypes[1]}>`;
        break;
      case "Promise":
        typeText = `Promise<${mappedSubtypes[0]}>`;
        break;
      case "async_sequence":
        typeText = `AsyncIterable<${mappedSubtypes[0]}>`;
        break;
      default:
        typeText = `${idlType.generic}<${mappedSubtypes.join(", ")}>`;
        break;
    }
    return appendNull(typeText, idlType.nullable);
  }

  if (typeof idlType.idlType === "string") {
    const typeName = idlType.idlType;
    const mapped = primitiveTypeMap.get(typeName) ?? typeName;
    return appendNull(mapped, idlType.nullable);
  }

  return "unknown";
}

function emitParameter(argument, generatedNames) {
  const typeText = idlTypeToTs(argument.idlType, generatedNames);
  const name = toBindingName(argument.name);
  if (argument.variadic) {
    return `...${name}: Array<${typeText}>`;
  }
  const isOptional = Boolean(argument.optional || argument.default);
  return `${name}${isOptional ? "?" : ""}: ${typeText}`;
}

function emitCallable(argumentsList, returnType, generatedNames) {
  const parameters = argumentsList.map(argument => emitParameter(argument, generatedNames)).join(", ");
  return `(${parameters}) => ${idlTypeToTs(returnType, generatedNames)}`;
}

function emitOperationSignature(member, generatedNames) {
  const params = (member.arguments ?? []).map(argument => emitParameter(argument, generatedNames)).join(", ");
  const methodName = member.name || (member.special === "stringifier" ? "toString" : null);
  if (methodName === null) {
    return null;
  }
  return `${toMemberName(methodName)}(${params}): ${idlTypeToTs(member.idlType, generatedNames)};`;
}

function emitIndexSignature(member, generatedNames) {
  if (member.type !== "operation" || member.special !== "getter" || member.name) {
    return null;
  }
  const [argument] = member.arguments ?? [];
  if (!argument) {
    return null;
  }
  if (argument.idlType.idlType !== "unsigned long") {
    return null;
  }
  const keyType = "number";
  return `[key: ${keyType}]: ${idlTypeToTs(member.idlType, generatedNames)};`;
}

function emitIterableMembers(parentName, member, generatedNames) {
  const params = (member.arguments ?? []).map(argument => emitParameter(argument, generatedNames)).join(", ");
  const argSuffix = params.length > 0 ? params : "";
  if ((member.idlType ?? []).length === 1) {
    const valueType = idlTypeToTs(member.idlType[0], generatedNames);
    const iteratorType = member.async ? "AsyncIterableIterator" : "IterableIterator";
    const symbolName = member.async ? "Symbol.asyncIterator" : "Symbol.iterator";
    return [
      `[${symbolName}](${argSuffix}): ${iteratorType}<${valueType}>;`,
      `values(${argSuffix}): ${iteratorType}<${valueType}>;`
    ];
  }

  const [keyTypeNode, valueTypeNode] = member.idlType;
  const keyType = idlTypeToTs(keyTypeNode, generatedNames);
  const valueType = idlTypeToTs(valueTypeNode, generatedNames);
  const iteratorType = member.async ? "AsyncIterableIterator" : "IterableIterator";
  const symbolName = member.async ? "Symbol.asyncIterator" : "Symbol.iterator";
  return [
    `[${symbolName}](${argSuffix}): ${iteratorType}<readonly [${keyType}, ${valueType}]>;`,
    `entries(${argSuffix}): ${iteratorType}<readonly [${keyType}, ${valueType}]>;`,
    `keys(${argSuffix}): ${iteratorType}<${keyType}>;`,
    `values(${argSuffix}): ${iteratorType}<${valueType}>;`,
    `forEach(callback: (value: ${valueType}, key: ${keyType}, parent: ${parentName}) => void): void;`
  ];
}

function emitInterfaceMembers(definition, generatedNames) {
  const instanceLines = [];
  const staticLines = [];
  const constructorMembers = [];
  const seenIndexedSignature = new Set();

  for (const member of definition.members ?? []) {
    switch (member.type) {
      case "constructor":
        constructorMembers.push(member);
        break;
      case "const": {
        const constLine = `readonly ${toMemberName(member.name)}: ${toLiteral(member.value)};`;
        instanceLines.push(constLine);
        staticLines.push(constLine);
        break;
      }
      case "attribute": {
        const line = `${member.readonly ? "readonly " : ""}${toMemberName(member.name)}: ${idlTypeToTs(member.idlType, generatedNames)};`;
        if (member.special === "static") {
          staticLines.push(line);
        } else {
          instanceLines.push(line);
        }
        break;
      }
      case "operation": {
        const signature = emitOperationSignature(member, generatedNames);
        if (signature) {
          if (member.special === "static") {
            staticLines.push(signature);
          } else {
            instanceLines.push(signature);
          }
        }
        const indexSignature = emitIndexSignature(member, generatedNames);
        if (indexSignature && !seenIndexedSignature.has(indexSignature)) {
          seenIndexedSignature.add(indexSignature);
          instanceLines.push(indexSignature);
        }
        break;
      }
      case "iterable":
        instanceLines.push(...emitIterableMembers(definition.name, member, generatedNames));
        break;
    }
  }

  return { constructorMembers, instanceLines, staticLines };
}

function emitDictionaryMembers(definition, generatedNames) {
  return (definition.members ?? []).map(member => {
    const property = `${toMemberName(member.name)}${member.required ? "" : "?"}: ${idlTypeToTs(member.idlType, generatedNames)};`;
    return property;
  });
}

function emitImports(kind, definition, registry, generatedNames, unresolvedNames) {
  const { generatedRefs, unresolvedRefs } = collectReferencesForDefinition(kind, definition, registry, generatedNames);
  const importLines = [];

  const generatedImports = [...generatedRefs].sort();
  for (const importedName of generatedImports) {
    importLines.push(`import type { ${importedName} } from "./${importedName}.js";`);
  }

  if (unresolvedRefs.size > 0) {
    for (const unresolvedName of unresolvedRefs) {
      unresolvedNames.add(unresolvedName);
    }
    importLines.push(`import type { ${[...unresolvedRefs].sort().join(", ")} } from "./globals.js";`);
  }

  if (importLines.length === 0) {
    return "";
  }
  return `${importLines.join("\n")}\n\n`;
}

function emitHeritage(baseTypes) {
  return baseTypes.length > 0 ? ` extends ${baseTypes.join(", ")}` : "";
}

function emitDefinitionFile(name, kind, definition, registry, generatedNames, unresolvedNames) {
  const imports = emitImports(kind, definition, registry, generatedNames, unresolvedNames);

  switch (kind) {
    case "typedefs": {
      return `${imports}export type ${name} = ${idlTypeToTs(definition.idlType, generatedNames)};\n`;
    }
    case "callbackFunctions": {
      return `${imports}export type ${name} = ${emitCallable(definition.arguments ?? [], definition.idlType, generatedNames)};\n`;
    }
    case "enumerations": {
      const members = definition.values.map(value => JSON.stringify(value.value));
      return `${imports}export type ${name} = ${members.length > 0 ? members.join(" | ") : "never"};\n`;
    }
    case "dictionaries": {
      const baseTypes = definition.inheritance ? [definition.inheritance] : [];
      const members = emitDictionaryMembers(definition, generatedNames);
      return `${imports}export interface ${name}${emitHeritage(baseTypes)} {\n${members.map(line => `  ${line}`).join("\n")}\n}\n`;
    }
    case "interfaceMixins":
    case "callbackInterfaces":
    case "interfaces": {
      const includedMixins = registry.includes.get(name) ?? new Set();
      const mixins = [...includedMixins].sort();
      const baseTypes = [definition.inheritance, ...mixins].filter(Boolean);
      const { constructorMembers, instanceLines, staticLines } = emitInterfaceMembers(definition, generatedNames);
      const noInterfaceObject = kind !== "interfaces" || hasExtAttr(definition.extAttrs, "LegacyNoInterfaceObject");
      let source = `${imports}export interface ${name}${emitHeritage(baseTypes)} {\n${instanceLines.map(line => `  ${line}`).join("\n")}\n}\n`;

      if (!noInterfaceObject) {
        const constructorLines = [`readonly prototype: ${name};`];
        for (const member of constructorMembers) {
          const params = (member.arguments ?? []).map(argument => emitParameter(argument, generatedNames)).join(", ");
          constructorLines.push(`new(${params}): ${name};`);
        }
        constructorLines.push(...staticLines);
        source += `\nexport interface ${name}Constructor {\n${constructorLines.map(line => `  ${line}`).join("\n")}\n}\n`;
        source += `\nexport declare const ${name}: ${name}Constructor;\n`;
      }

      return source;
    }
    default:
      throw new TypeError(`Unsupported definition kind: ${kind}`);
  }
}

async function formatSource(fileName, source) {
  const { code } = await format(fileName, source, {
    arrowParens: "always",
    printWidth: 120,
    trailingComma: "all"
  });
  return code;
}

async function listWebidlFiles(source) {
  const stats = await fs.stat(source.idlPath);
  if (!stats.isDirectory()) {
    return [{ idlPath: source.idlPath, impl: source.impl }];
  }

  const entries = await fs.readdir(source.idlPath);
  return entries
    .filter(entry => entry.endsWith(".webidl"))
    .sort((a, b) => a.localeCompare(b))
    .map(entry => ({ idlPath: path.join(source.idlPath, entry), impl: source.impl }));
}

function parseIntoRegistry(contents) {
  const registry = createRegistry();
  for (const rootType of builtinIdl) {
    registerDefinition(registry, rootType);
  }

  for (const content of contents) {
    const rootTypes = parse(content.idlContent);
    for (const rootType of rootTypes) {
      if (rootType.type === "includes") {
        applyIncludes(registry, rootType.target, rootType.includes);
        continue;
      }
      registerDefinition(registry, rootType);
    }
  }

  return registry;
}

async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function writeFile(outputDir, name, source) {
  await fs.writeFile(path.join(outputDir, `${name}.ts`), `${source.trimEnd()}\n`, "utf8");
}

export default class Transformer {
  constructor(options = {}) {
    this.options = options;
    this.sources = [];
  }

  addSource(idl, impl) {
    if (typeof idl !== "string") {
      throw new TypeError("idl path has to be a string");
    }
    if (typeof impl !== "string") {
      throw new TypeError("impl path has to be a string");
    }
    this.sources.push({ idlPath: path.resolve(idl), impl: path.resolve(impl) });
    return this;
  }

  async generate(outputDir) {
    await ensureDirectory(outputDir);

    const nestedFiles = await Promise.all(this.sources.map(source => listWebidlFiles(source)));
    const files = nestedFiles.flat();
    const contents = await Promise.all(
      files.map(async file => ({
        idlContent: await fs.readFile(file.idlPath, "utf8"),
        impl: file.impl
      }))
    );

    const registry = parseIntoRegistry(contents);
    const generatedNames = generatedTypeNames(registry);
    const unresolvedNames = new Set();
    const outputNames = registry.order.map(({ name }) => name);

    await Promise.all(
      registry.order.map(async ({ key, name }) => {
        const definition = registry[key].get(name);
        const source = emitDefinitionFile(name, key, definition, registry, generatedNames, unresolvedNames);
        const formatted = await formatSource(`${name}.ts`, source);
        await writeFile(outputDir, name, formatted);
      })
    );

    const globalsSource = [...unresolvedNames]
      .sort((a, b) => a.localeCompare(b))
      .map(name => `export interface ${name} {}`)
      .join("\n");
    await writeFile(outputDir, "globals", await formatSource("globals.ts", globalsSource || "export {};"));

    const indexSource = [...outputNames, "globals"]
      .sort((a, b) => a.localeCompare(b))
      .map(name => `export * from "./${name}.js";`)
      .join("\n");
    await writeFile(outputDir, "index", await formatSource("index.ts", indexSource));
  }
}
