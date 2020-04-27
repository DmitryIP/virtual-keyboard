module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["airbnb/base"],
  rules: {
    semi: ["warn", "always"],
    quotes: ["warn", "double"],
    indent: [
      2,
      4,
      {
        SwitchCase: 1,
      },
    ],
  },
};
