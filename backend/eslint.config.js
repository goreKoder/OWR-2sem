// import { defineConfig } from "eslint/config";
// import globals from "globals";
// import js from "@eslint/js";
// import tseslint from "typescript-eslint";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts}"] },
//   { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
//   { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
//   tseslint.configs.recommended,
// ]);
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier'; // Добавляем интеграцию с Prettier

export default defineConfig([
  // Базовые настройки для всех файлов
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Рекомендуемые правила ESLint (аналог "eslint:recommended")
  js.configs.recommended,

  // Рекомендуемые правила для TypeScript (аналог "plugin:@typescript-eslint/recommended")
  ...tseslint.configs.recommended,

  // Интеграция с Prettier (аналог "prettier")
  eslintConfigPrettier,

  // Ваши кастомные правила
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'prettier/prettier': 'error',
    },
  },
]);
