const cmc = require('./keys/cmc_key')

export const mongoConfig = {
    url: 'mongodb://localhost:27017'
}

export const cmcConfig = {
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    key: cmc.key
}

export const clientConfig = {
    url: 'https://localhost:8443/api',
    key: 'API_KEY here'
}

export const tlsConfig = {
    http_port: '8080',
    https_port: '8443'
}