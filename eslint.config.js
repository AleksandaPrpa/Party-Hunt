import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default defineConfig({
  languageOptions: {
    globals: globals.browser,
  },
  plugins: {
    react: pluginReact,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
