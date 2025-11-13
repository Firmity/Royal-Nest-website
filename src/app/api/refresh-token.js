const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const credentials = JSON.parse(fs.readFileSync("client_secret_140661584368-v04nnd25lfcaj07evdbpvnquuort4ju6.apps.googleusercontent.com.json"));
const { client_secret, client_id } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  "https://developers.google.com/oauthplayground"
);

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPES,
});

console.log("1️⃣ Visit this URL:");
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("2️⃣ Paste auth code here: ", async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);

    console.log("3️⃣ REFRESH TOKEN:");
    console.log(tokens.refresh_token);

    fs.writeFileSync("refresh_token.txt", tokens.refresh_token);
    console.log("Saved to refresh_token.txt");

    rl.close();
  } catch (err) {
    console.error("❌ Error generating token:", err);
  }
});