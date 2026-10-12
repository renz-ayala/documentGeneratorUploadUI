const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'ui-upload',
  filename: 'remoteEntry.js',
  exposes: {
    './UploadForm': './src/app/features/pages/upload-form/upload-form.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
