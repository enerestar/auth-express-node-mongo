const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const postmark = require('./postmark');

const bcrypt = require('bcrypt');
const crypto = require('./crypto');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const credentials = require('./sslcert/credentials');
const config = require('./config');
const dbQuery = require('./dbQuery');
const mongoClient = require('./mongoClient');
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
    let password_hash
    // generate email token
    email_verification_token = crypto.generateRandomString();
    req.body.email_verification_token = email_verification_token;
    // generate password hash
    try {
        password_hash = await crypto.generatePasswordHash(req.body.password2)
    } catch (err) {
        throw err;
    }
    req.body.password_hash = password_hash;
    req.body.register_status = false;
    delete req.body.password1;
    delete req.body.password2;
    // store relevant data into mongodb
    try {
        let user = req.body;
        const dbCollection = await mongoClient.connectToDB();
        await dbQuery.createUser(dbCollection, user);
        postmark.sendEmail(email_verification_token, req.body.email);
        res.send("We have sent an email with a confirmation link to your email address");    
    } catch(err) {
        console.log(err);
        console.log("This email already exists.")
    }
})

app.get('/verify', async(req,res) => {
    if (req.query.token === undefined) {
        res.redirect('/register');
        return;
      };
    // decode email and email token
    let decodedToken = crypto.decode(req.query.token);
    let decodeEmail = crypto.decode(req.query.user);
    // connect to db
    try {
        const userEmailVerificationToken = { "email_verification_token" : decodedToken };
        const dbCollection = await mongoClient.connectToDB();
        const user = await dbQuery.getUser(dbCollection, userEmailVerificationToken);
        const accessToken = crypto.generateAccessToken();
        if (user != null) {
            const userEmail = { "email": decodeEmail };
            const value = { register_status: true, accessToken: accessToken };
            await dbQuery.updateUser(dbCollection, userEmail, value);
        }
    } catch(err) {
        console.log(err);
        res.send("Invalid email link!")
        return;
    }
    res.sendFile(__dirname +'/html/verify.html');
})
app.get('/login', async (req, res) => {
    const sessionID = req.sessionID;
    const sessionData = sessionStorage[sessionID]
    // if user is login and has session, then give api token
    if (sessionData != undefined) {
        const userEmail = { "email": sessionData.email }
        const dbCollection = await mongoClient.connectToDB();
        const user = await dbQuery.getUser(dbCollection, userEmail);
        const accessToken = user.accessToken;
        res.send
        res.send(`Your API_KEY is: ${accessToken} <p></p> https://localhost:9554/api with access token`)
    } else {
      console.log(sessionData)
      res.sendFile(__dirname + "/html/login.html");
    }
})

app.post('/login/submit', async(req, res) => {
    const sessionID = req.sessionID;
    if (req.body.email === "" || req.body === undefined) {
      res.send("Email must not be empty");
    };
    const email = req.body.email;
    const password = req.body.password;
    try {
        const userEmail = { "email": email };
        const dbCollection = await mongoClient.connectToDB();
        const user = await dbQuery.getUser(dbCollection, userEmail);
        const register_status = user.register_status;
        if (register_status === false) {
            res.status(401);
            res.send("Please verify your email");
          }
          const password_hash = user.password_hash;
          const accessToken = user.accessToken;
          const match = await bcrypt.compare(password, password_hash);      
        if (match) {
            sessionStorage[sessionID] = { email }
            res.send(`Your API_KEY is: ${accessToken} <p></p> https://localhost:9554/api with access token`);
          } else {
            delete sessionStorage[sessionID];
            res.send('Password is incorrect');
          }
    } catch(err) {
        console.log(err);
        res.send("Email does not exists");
    }
})

app.get('/api', async(req, res) => {
    try {
        const apiKey = {"accessToken": req.headers.api_key};
        const dbCollection = await mongoClient.connectToDB();
        const user = await dbQuery.getUser(dbCollection, apiKey);
        if (user != null) {
            let data = await coinMarketCapAPI();
            res.send(data);
        } else {
            res.sendStatus(403);
        }
    } catch(err) {
        console.log(err);
        res.status(500);
        res.send(err.toString());
    }
})

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(config.tlsConfig.http_port);
httpsServer.listen(config.tlsConfig.https_port);