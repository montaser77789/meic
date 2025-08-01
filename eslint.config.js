// eslint.config.js
import { next } from "@next/eslint-plugin-next";

export default [
  ...next(),
  {
    ignores: ["src/generated/**"], // ✅ تجاهل كل الملفات داخل src/generated
  },
];
