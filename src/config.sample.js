const cmc = require('./keys/cmc_key')

const mongoConfig = {
    url: 'mongodb://localhost:27017'
}

const cmcConfig = {
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    key: cmc.key
}

const clientConfig = {
    url: 'https://localhost:9554/api',
    key: ''
}

const tlsConfig = {
    http_port: '9090',
    https_port: '9554'
}

module.exports = {
    mongoConfig,
    cmcConfig,
    clientConfig,
    tlsConfig
}