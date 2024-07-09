import parser from "astro-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        ".cache",
        ".astro",
        ".vercel",
        "node_modules",
        "dist",
        "public",
        "src/env.d.ts",
    ],
}, ...compat.extends(
    "@thoughtbot/eslint-config",
    "@thoughtbot/eslint-config/typescript",
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
), {
    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "import/prefer-default-export": "off",

        "react/jsx-filename-extension": [1, {
            extensions: [".ts", ".tsx", ".astro"],
        }],
    },
}, {
    files: ["**/*.astro"],

    languageOptions: {
        parser: parser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            parser: "@typescript-eslint/parser",
            extraFileExtensions: [".astro"],
        },
    },

    rules: {
        "react/no-unknown-property": ["error", {
            ignore: ["class"],
        }],
    },

    processor: "astro/client-side-ts",
}];