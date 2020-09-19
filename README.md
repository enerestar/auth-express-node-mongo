
# User Registration Journey

View register form
Submit registration data

Receive email verification email
Click on verification link

Open browser at email verification link and submit email token
View email verification successful page with link to login page
Go to login page

Submit login data
View after-login screen, with access token and guide/link on how to call API

Call API



# To setup the project, 

1. git clone repository and load the dependencies with
`npm install`

2. Setup https on local host with [mkcert](https://github.com/FiloSottile/mkcert)
`brew install mkcert`
`brew install nss` // for firefox
`mkcert -install`
`mkcert localhost 127.0.0.1`

3. Move the generated key and cert into folder sslcert and rename to server.crt and server.key.
`mv localhost+1-key.pem ./src/sslcert/server.key`
`mv localhost+1.pem ./src/sslcert/server.crt` 

4. Request for coinmarketcap API [here](https://coinmarketcap.com/api/)

```
cd keys
cp coinmarketcap_key.sample.json coinmarketcap_key.json
```

5. Request for postmark server key [here](https://postmarkapp.com/) 
- Sign up for free trial 
- Request for approval for transaction emails to be able to send to any email.


6. Create a mongodb locally
`docker run --name test-mongo -p 27017:27017 -d mongo:4.2.3-bionic`

To view DB, you can download [MongoDB Compass](https://www.mongodb.com/products/compass) and connect with `mongodb://localhost:27017`

7. Edit necessary configs and keys in `./src/config.js`
```
cp config.sample.js config.js
```

8. to run `npm run dev-watch` or `npm run dev`

9. Go to [localhost:9554](https://localhost:9554)

10. Once API token received, make a call to `https://localhost:9554/api` with API_KEY via postman OR
run `node src/client.js` after editing to include your API_KEY