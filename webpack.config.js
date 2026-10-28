const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

const webpackConfig = withModuleFederationPlugin({
  name: 'ui-upload',
  filename: 'remoteEntry.js',
  exposes: {
    './UploadForm': './src/app/features/pages/upload-form/upload-form.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

webpackConfig.watchOptions = {
  ignored: /node_modules|\.angular|dist/,
};

module.exports = webpackConfig;
