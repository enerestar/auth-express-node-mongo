const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const fs = require('fs');
const postmark = require('./postmark');

const bcrypt = require('bcrypt');
const crypto = require('./crypto');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const credentials = require('./sslcert/credentials');
const config = require('./config');
const dbQuery = require('./dbQuery');
const coinMarketCapAPI = require('./cmc');

const app = express();
const sessionStorage = {}

app.use(cookieParser());

app.use((req,res,next) => {
    console.log('');
    console.log(`Request received with METHOD ${req.method} and PATH = ${req.url}`);
    next();
})

app.use(session({
    genid:(req) => {
        return crypto.generateRandomString();
    },
    resave: false,
    secret: "somesecrethere",
    saveUninitialized: true
}))

app.use((req, res, next) => {
    const sessionID = req.sessionID;
    console.log(`Session ID from client = ${sessionID}`);
    console.log(`Session state = ${JSON.stringify(sessionStorage[sessionID])}`);
    next();
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/register', async(req,res) => {
    dbQuery.createUser({});
    dbQuery.updateUser({}, {});
    dbQuery.getUser({});
})

app.get('/verify', async(req,res) => {

})

app.get('/login', async (req, res) => {

})

app.post('/login/submit', async(req, res) => {

})

app.get('/api', async(req, res) => {

})

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(config.tlsConfig.http_port);
httpsServer.listen(config.tlsConfig.https_port);