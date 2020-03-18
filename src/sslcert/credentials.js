const privateKey = fs.readFileSync('./src/sslcert/server.key');
const certificate = fs.readFileSync('./src/sslcert/server.crt');
export const credentials = { key: privateKey, certificate };
