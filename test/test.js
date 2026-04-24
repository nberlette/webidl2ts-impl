import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { before, describe, test } from "node:test";

import Transformer from "../lib/transformer.js";

const updateSnapshots = process.env.UPDATE_SNAPSHOTS === "1";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const casesDir = path.resolve(__dirname, "cases");
const implsDir = path.resolve(__dirname, "implementations");
const outputDir = path.resolve(__dirname, "output");
const snapshotsDir = path.resolve(__dirname, "snapshots");
const tscPath = path.resolve(rootDir, "node_modules", ".bin", process.platform === "win32" ? "tsc.cmd" : "tsc");

async function resetOutput() {
  await fs.rm(outputDir, { force: true, recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
}

async function readTsDirectory(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const fileMap = new Map();
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".ts")) {
      continue;
    }
    const filePath = path.join(dirPath, entry.name);
    fileMap.set(entry.name, await fs.readFile(filePath, "utf8"));
  }
  return fileMap;
}

async function syncSnapshot(outputPath, snapshotPath) {
  await fs.rm(snapshotPath, { force: true, recursive: true });
  await fs.mkdir(snapshotPath, { recursive: true });

  for (const [fileName, contents] of await readTsDirectory(outputPath)) {
    await fs.writeFile(path.join(snapshotPath, fileName), contents, "utf8");
  }
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

async function typecheckGeneratedOutput() {
  const tsconfigPath = path.resolve(outputDir, "tsconfig.generated.json");
  const tsconfig = {
    compilerOptions: {
      module: "NodeNext",
      moduleResolution: "NodeNext",
      noEmit: true,
      skipLibCheck: true,
      strict: true,
      target: "ES2024",
      verbatimModuleSyntax: true
    },
    include: ["./**/*.ts"]
  };
  await fs.writeFile(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`, "utf8");
  execFileSync(tscPath, ["--project", tsconfigPath], {
    cwd: outputDir,
    stdio: "pipe"
  });
  await fs.rm(tsconfigPath, { force: true });
}

before(resetOutput);

describe("generation", () => {
  describe("built-in types", () => {
    test("matches the built-in snapshots", async () => {
      await resetOutput();
      const transformer = new Transformer();
      await transformer.generate(outputDir);
      await typecheckGeneratedOutput();
      await assertDirectorySnapshot(outputDir, path.resolve(snapshotsDir, "built-in-types"));
    });
  });

  describe("without processors", () => {
    test("matches the case snapshots", async () => {
      await resetOutput();
      const transformer = new Transformer();
      transformer.addSource(casesDir, implsDir);
      await transformer.generate(outputDir);
      await typecheckGeneratedOutput();
      await assertDirectorySnapshot(outputDir, path.resolve(snapshotsDir, "without-processors"));
    });
  });

  describe("with processors", () => {
    test("ignores runtime-only processors and emits the same types", async () => {
      await resetOutput();
      const transformer = new Transformer({
        processCEReactions(code) {
          return code;
        },
        processHTMLConstructor(code) {
          return code;
        },
        processReflect() {
          return { get: "", set: "" };
        }
      });
      transformer.addSource(casesDir, implsDir);
      await transformer.generate(outputDir);
      await typecheckGeneratedOutput();
      await assertDirectorySnapshot(outputDir, path.resolve(snapshotsDir, "with-processors"));
    });
  });
});
