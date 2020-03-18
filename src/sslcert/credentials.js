const fs = require('fs');

const privateKey = fs.readFileSync('./src/sslcert/server.key');
const certificate = fs.readFileSync('./src/sslcert/server.crt');

const credentials = (privateKey, certificate) => {
    return { key: privateKey, certificate }
}

exports.credentials = credentials;

credentials(privateKey,certificate)
