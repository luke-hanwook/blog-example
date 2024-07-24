import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginTailwindCSS from "eslint-plugin-tailwindcss";
import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginTailwindCSS.configs["flat/recommended"],
  ...fixupConfigRules(pluginReactConfig),
  ...fixupConfigRules(compat.extends("plugin:@next/next/recommended")),
  {
    rules: {
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 0,
    },
  },
];
