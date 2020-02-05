const { ANALYZE, NODE_ENV } = process.env;
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const APP_ROUTES = require('./routes-list');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/components/style/themes/ant-default-vars.less'), 'utf8'));

process.env.SUB_DIR = NODE_ENV === 'production' ? '/selfcare' : '';

const basePath = __dirname;
const pckgFilePath = `${basePath}/package.json`;
const configFilePath = `${basePath}/app-version.js`;
const { version } = JSON.parse(fs.readFileSync(pckgFilePath, 'utf8'));
fs.writeFileSync(configFilePath, 'export const appVersion = 1.01\n');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => { } // eslint-disable-line
}
module.exports = {
  exportTrailingSlash: true,
  generateEtags: false, // stop generating etags
  assetPrefix: process.env.SUB_DIR,
  async exportPathMap() {
    const paths = {};
    let dynamicSection = '';
    APP_ROUTES.forEach((routes) => {
      if (routes.subRoutes) {
        routes.subRoutes.forEach((subRoute) => {
          const routePattern = routes.pattern.split('/');
          routePattern.forEach((routeItem, index) => {
            if (routeItem.indexOf(':') >= 0) {
              dynamicSection = routeItem.replace(':', '');
              dynamicSection = `[${dynamicSection}]`;
              routePattern[index] = dynamicSection;
            }
          });
          const derivedPattern = routePattern.join('/');
          const derivedRoute = routes.pattern.replace(':section', subRoute);
          paths[derivedRoute] = { page: derivedPattern, query: { section: subRoute, tags: routes.page + subRoute } };
        });
      } else {
        paths[routes.pattern] = { page: routes.pattern };
      }
    });
    return paths;
  },

  generateBuildId: async () => version,
  webpack: (config, { isServer }) => {
    config.output.publicPath = '';
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [ // eslint-disable-line
        (context, request, callback) => { // eslint-disable-line
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      });
    }

    if (ANALYZE) {
      // eslint-disable-next-line global-require
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }));
    }

    config.node = {
      fs: 'empty'
    };

    config.module.rules = [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          cacheDirectory: true,
          plugins: [
            ['import', { libraryName: 'antd', style: 'css' }]
            // 'transform-strict-mode',
            // 'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              root: path.resolve(__dirname, './'),
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      }
    ];

    return config;
  }
};
