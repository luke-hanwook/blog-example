import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginTailwindCSS from "eslint-plugin-tailwindcss";
import pluginNext from "@next/eslint-plugin-next";
import { fixupConfigRules } from "@eslint/compat";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginTailwindCSS.configs.recommended,
  pluginNext.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 0,
    },
  },
];
