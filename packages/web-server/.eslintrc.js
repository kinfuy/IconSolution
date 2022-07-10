module.exports = {
  extends: ['@alqmc/eslint-config'],
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      alias: [
        ['@/apis', './src/apis'],
        ['@/views', './src/views']
      ]
    }
  }
};
