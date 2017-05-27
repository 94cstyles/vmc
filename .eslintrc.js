module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  globals: {
    'Vue': false
  },
  'rules': {
    'arrow-parens': 0,
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }]
  }
}
