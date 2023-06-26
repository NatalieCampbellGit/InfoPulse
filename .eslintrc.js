module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: ["semistandard", "prettier"],
  rules: {
    "no-unused-vars": "error",
    "no-undef": "error",
  },
};
