module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "eslint:recommended"],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-unused-vars': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  globals: {
    $: true,
    jQuery: true
  },

  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ]
};
