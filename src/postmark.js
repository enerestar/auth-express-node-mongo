const postmark = require('postmark');
const crypto = require('./src/crypto');

/**
 * 
 * @param {Base64} encoded 
 */
const sendEmail = (token, email) => {
    const client = new postmark.ServerClient("31336e48-ac4d-47cd-b63e-34d5b77c171c");
    let encodedToken = crypto.encode(token);
    let encodedEmail = crypto.encode(email)
    client.sendEmail(buildPostmarkBody(encodedToken, encodedEmail, email));
}
  
let buildPostmarkBody = (encodedToken, encodedEmail, email) => {
    let body = {};
    body['From'] = "serene@enerestar.com";
    body['To'] = email;
    body['Subject'] = "Welcome!";
    body['Tag'] = "Email verification";
    body['HtmlBody'] = "<b>Hi there! Verify your email address</b> <a href='https://localhost:8443/verify?user=" + encodedEmail + "&token=" + encodedToken + "'>here</a>",
    body['TextBody'] = "Hello";
    body['ReplyTo'] = "serene@enerestar.com";
    body['TrackOpens'] = true;
    body['TrackLinks'] = "HtmlAndText";
    return body;
}

exports.sendEmail = sendEmail;