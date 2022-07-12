const args = require('yargs').option('help', {
    alias: 'h',
    description: 'Provides help options'
}).option('version', {
    alias: 'v',
    description: 'Current package version'
}).argv;

module.exports = { args };