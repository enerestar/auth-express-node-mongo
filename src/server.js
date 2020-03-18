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

dbQuery.createUser({});
dbQuery.updateUser({}, {});
dbQuery.getUser({});