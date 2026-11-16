// Konfigurasi ESLint Flat Config versi 10. Target sengaja hanya folder src/.
// File referensi hasil perbaikan tidak ikut diperiksa sebelum digunakan.
export default [
  {
    ignores: ["node_modules/**", "referensi/**", "reports/**", "docs/**", "tests/**", "scripts/**"],
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-var": "error",
      "no-unused-vars": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "prefer-const": "warn",
      "no-undef": "error",
      "no-debugger": "error",
      "no-unreachable": "error",
      "no-constant-condition": "error",
    },
  },
];
