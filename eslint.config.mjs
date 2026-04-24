import domenicConfig from "@domenic/eslint-config";
import stylisticConfig from "@domenic/eslint-config/stylistic";
import globals from "globals";

export default [
  {
    ignores: ["test/output/", "test/snapshots/"]
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node
    }
  },
  ...domenicConfig,
  ...stylisticConfig,
  {
    rules: {
      "@stylistic/max-len": ["error", { code: 120, ignoreUrls: true, ignoreTemplateLiterals: true }],
      "require-unicode-regexp": "off"
    }
  }
];
