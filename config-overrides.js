const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function(config, env) {
  config = injectBabelPlugin([
    'import', {
      libraryName: 'antd',
      librayDirectory: 'es',
      style: true
    }
  ], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#00ACAC'
    }
  })(config, env);

  return config;
}