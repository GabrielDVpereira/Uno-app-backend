module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["prettier", "eslint:recommended"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
