import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier'; // Добавляем плагин

export default defineConfig([
  // Базовые настройки
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Рекомендуемые правила ESLint
  js.configs.recommended,

  // Рекомендуемые правила TypeScript
  ...tseslint.configs.recommended,

  // Интеграция с Prettier (два шага)
  {
    // 1. Добавляем сам плагин
    plugins: {
      prettier: prettierPlugin,
    },
  },
  eslintConfigPrettier, // 2. Отключаем конфликтующие правила

  // Кастомные правила
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'prettier/prettier': 'error', // Теперь это правило будет работать
    },
  },
]);
//     npm run lint -- --fix