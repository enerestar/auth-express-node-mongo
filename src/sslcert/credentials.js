const fs = require('fs');

const privateKey = fs.readFileSync('./src/sslcert/server.key');
const certificate = fs.readFileSync('./src/sslcert/server.crt');

const credentials = { key: privateKey, cert: certificate }

module.exports = credentials;