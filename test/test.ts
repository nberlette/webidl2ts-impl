// @ts-nocheck
import assert from "node:assert/strict";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import Transformer from "../lib/transformer.ts";
import reflector from "./reflector.ts";

const updateSnapshots = Deno.env.get("UPDATE_SNAPSHOTS") === "1";
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "..");
const casesDir = path.resolve(currentDir, "cases");
const implsDir = path.resolve(currentDir, "implementations");
const outputDir = path.resolve(currentDir, "output");
const snapshotsDir = path.resolve(currentDir, "snapshots");

async function resetOutput() {
  await fs.rm(outputDir, { force: true, recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
}

async function readTsDirectory(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const tsEntries = entries.filter(entry => entry.isFile() && entry.name.endsWith(".ts"));
  const contents = await Promise.all(
    tsEntries.map(async entry => [entry.name, await fs.readFile(path.join(dirPath, entry.name), "utf8")])
  );
  return new Map(contents);
}

async function syncSnapshot(outputPath, snapshotPath) {
  await fs.rm(snapshotPath, { force: true, recursive: true });
  await fs.mkdir(snapshotPath, { recursive: true });

  const outputFiles = await readTsDirectory(outputPath);
  await Promise.all(
    [...outputFiles].map(([fileName, contents]) => fs.writeFile(path.join(snapshotPath, fileName), contents, "utf8"))
  );
}

async function assertDirectorySnapshot(outputPath, snapshotPath) {
  const outputFiles = await readTsDirectory(outputPath);
  if (updateSnapshots) {
    await syncSnapshot(outputPath, snapshotPath);
    return;
  }

  const snapshotFiles = await readTsDirectory(snapshotPath);
  assert.deepStrictEqual([...outputFiles.keys()].sort(), [...snapshotFiles.keys()].sort());
  for (const [fileName, contents] of outputFiles) {
    assert.strictEqual(contents, snapshotFiles.get(fileName), fileName);
  }
}

async function checkGeneratedOutput() {
  const entries = await fs.readdir(outputDir, { withFileTypes: true });
  const files = entries
    .filter(entry => entry.isFile() && entry.name.endsWith(".ts"))
    .map(entry => path.join(outputDir, entry.name))
    .sort();
  const command = new Deno.Command(Deno.execPath(), {
    args: ["check", ...files],
    stderr: "piped",
    stdout: "piped"
  });
  const result = await command.output();
  if (!result.success) {
    throw new Error(new TextDecoder().decode(result.stderr));
  }
}

Deno.test("generation: built-in types", async () => {
  await resetOutput();
  const transformer = new Transformer();
  await transformer.generate(outputDir);
  await checkGeneratedOutput();
  await assertDirectorySnapshot(outputDir, path.resolve(snapshotsDir, "built-in-types"));
});

Deno.test("generation: without processors", async () => {
  await resetOutput();
  const transformer = new Transformer();
  transformer.addSource(casesDir, implsDir);
  await transformer.generate(outputDir);
  await checkGeneratedOutput();
  await assertDirectorySnapshot(outputDir, path.resolve(snapshotsDir, "without-processors"));
});

Deno.test("generation: with processors", async () => {
  await resetOutput();
  const transformer = new Transformer({
    processCEReactions(code) {
      const ceReactions = this.addImport("../CEReactions");
      return `
        ${ceReactions}.preSteps(globalObject);
        try {
          ${code}
        } finally {
          ${ceReactions}.postSteps(globalObject);
        }
      `;
    },
    processHTMLConstructor() {
      const htmlConstructor = this.addImport("../HTMLConstructor", "HTMLConstructor");
      return `
        return ${htmlConstructor}(globalObject, interfaceName);
      `;
    },
    processReflect(idl, implObj) {
      const reflectAttr = idl.extAttrs.find(attr => attr.name === "Reflect");
      const attrName =
        (reflectAttr && reflectAttr.rhs && reflectAttr.rhs.value.replace(/_/g, "-")) || idl.name.toLowerCase();
      if (idl.idlType.idlType === "USVString") {
        const reflectURL = idl.extAttrs.find(attr => attr.name === "ReflectURL");
        if (reflectURL) {
          const whatwgURL = this.addImport("whatwg-url");
          return {
            get: `
              const value = ${implObj}.getAttributeNS(null, "${attrName}");
              if (value === null) {
                return "";
              }
              const urlRecord = ${whatwgURL}.parseURL(value, { baseURL: "http://localhost:8080/" });
              return urlRecord === null ? conversions.USVString(value) : ${whatwgURL}.serializeURL(urlRecord);
            `,
            set: `
              ${implObj}.setAttributeNS(null, "${attrName}", V);
            `
          };
        }
      }
      const reflect = reflector[idl.idlType.idlType];
      return {
        get: reflect.get(implObj, attrName),
        set: reflect.set(implObj, attrName)
      };
    }
  });
  transformer.addSource(casesDir, implsDir);
  await transformer.generate(outputDir);
  await checkGeneratedOutput();
  await assertDirectorySnapshot(outputDir, path.resolve(snapshotsDir, "with-processors"));
});

Deno.test("generation: utils.ts is copied exactly", async () => {
  await resetOutput();
  const transformer = new Transformer();
  await transformer.generate(outputDir);
  const input = await fs.readFile(path.resolve(rootDir, "lib/output/utils.ts"), "utf8");
  const output = await fs.readFile(path.resolve(outputDir, "utils.ts"), "utf8");
  assert.strictEqual(output, input);
});
