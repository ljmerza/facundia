const packageJson = require('../../package.json');

export const envBase = {
    appName: 'Facundia',
    envName: 'DEV',
    production: false,
    chUrl: null,
    test: false,
    versions: {
        app: packageJson.version,
        ...packageJson.dependencies
    }
};