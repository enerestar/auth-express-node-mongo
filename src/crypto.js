const crypto = require('crypto');
const bcrypt = require('bcrypt');

const encode = (data) => {
    let buff = new Buffer.from(data);
    let encoded = buff.toString('base64');
    return encoded;
}

const decode = (encoded) => {
    let buff = new Buffer.from(encoded, 'base64');
    let decoded = buff.toString('ascii');
    console.log(decoded)
    return decoded;
}
  
const generateAccessToken = () => {
    const randString= crypto.randomBytes(256 / 8).toString('base64');
    const tokenHash = crypto.createHash('sha3-256').update(randString).digest('base64');
    return tokenHash;
}
  
const generateRandomString = () => {
    return crypto.randomBytes(256 / 8).toString('base64');
}
  
const generatePasswordHash = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

module.exports = {
    encode,
    decode,
    generateAccessToken,
    generateRandomString,
    generatePasswordHash
}