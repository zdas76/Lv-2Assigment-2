import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      "no-undef": "warn",
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  {
    languageOptions: {
      globals: {
        var1: "writable",
        var2: "readonly",
      },
    },
  },
  {
    ignores: [".config/*"],
  },
];
