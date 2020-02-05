module.exports = function (api) {
  api.cache(true);

  const presets = [['next/babel', {
    'preset-env': { targets: { node: 'current' } }
  }], '@emotion/babel-preset-css-prop'
  ];

  const plugins = [
    'inline-dotenv',
    ['module-resolver', { root: ['./src'] }],
    ['import', { libraryName: 'antd', style: 'css' }],
    ['emotion']
  ];

  const env = {
    test: {
      presets: [
        ['next/babel', {
          'preset-env': {
            modules: 'commonjs'
          }
        }]
      ]
    }
  };
  return {
    presets,
    plugins,
    env
  };
};
