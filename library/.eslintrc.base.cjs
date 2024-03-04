module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: ['ts', 'tsx'],
        },
        style: {
          lang: 'scss',
        },
      },
    ],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/no-static-inline-styles': [
      'error',
      {
        allowBinding: true,
      },
    ],
  },
};
