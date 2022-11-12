module.exports = {
   root: true,
   parser: 'vue-eslint-parser',
   parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
   },
   env: {
      browser: true,
      node: true
   },
   globals: {
      __static: true
   },
   plugins: ['eslint-plugin-vue'],
   rules: {
      // allow debugger during development
      indent: ['error', 3],
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'vue/component-tags-order': [
         'error',
         {
            order: ['template', 'script', 'style']
         }
      ],
      'vue/max-attributes-per-line': [
         'error',
         { singleline: 3, multiline: { max: 1, allowFirstLine: true } }
      ],
      'vue/html-indent': ['error', 3, {}],
      'vue/html-closing-bracket-spacing': [
         'error',
         {
            startTag: 'never',
            endTag: 'never',
            selfClosingTag: 'always'
         }
      ],
      'vue/html-closing-bracket-newline': [
         'error',
         {
            singleline: 'never',
            multiline: 'never'
         }
      ],
      'vue/html-self-closing': [
         'error',
         {
            html: {
               void: 'never',
               normal: 'never',
               component: 'always'
            },
            svg: 'always',
            math: 'always'
         }
      ]
   },
   extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/vue3-recommended'
   ]
}
