import fs from "fs";
import { google } from "googleapis";

// Load OAuth credentials
const credentials = JSON.parse(fs.readFileSync("client_secret_140661584368-p7lkmee3l6q5mt9jn5j77ju3o55iaf2t.apps.googleusercontent.com.json"));
const token = JSON.parse(fs.readFileSync("token.json"));

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

oAuth2Client.setCredentials(token);

// Your Google Sheet ID
const SHEET_ID = "1uup2MyTpTV6cqKoTqe3mfKNO8ac454x2ZVu784xhKQs";

// Helper to extract body from Gmail message
function extractEmailBody(payload) {
  // Direct body
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, "base64").toString("utf8");
  }

  // Look inside parts
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        return Buffer.from(part.body.data, "base64").toString("utf8");
      }
      // If nested parts exist
      if (part.parts) {
        for (const nested of part.parts) {
          if (nested.mimeType === "text/plain" && nested.body?.data) {
            return Buffer.from(nested.body.data, "base64").toString("utf8");
          }
        }
      }
    }
  }

  return "";
}

// Fetch and save leads
async function fetchAndSaveLeads(startDate, endDate) {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const query = `subject:"New Brochure Request" after:${startDate} before:${endDate}`;

  const res = await gmail.users.messages.list({
    userId: "me",
    q: query
  });

  const messages = res.data.messages || [];
  console.log(`Found ${messages.length} leads`);

  const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

  for (const msg of messages) {
    const mail = await gmail.users.messages.get({
      userId: "me",
      id: msg.id,
      format: "full"
    });

    const body = extractEmailBody(mail.data.payload);
    console.log("EMAIL BODY:", body);

    const lead = {
      name: body.match(/Name:\s*(.*)/)?.[1]?.trim() ?? "",
      email: body.match(/Email:\s*(.*)/)?.[1]?.trim() ?? "",
      phone: body.match(/Phone:\s*(.*)/)?.[1]?.trim() ?? "",
      city: body.match(/City:\s*(.*)/)?.[1]?.trim() ?? "",
      dateCaptured: new Date().toLocaleString()
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values: [[lead.name, lead.email, lead.phone, lead.city, lead.dateCaptured]]
      }
    });

    console.log(`✔ Saved lead: ${lead.name}`);
  }

  console.log("✔ All leads added to Google Sheets");
}

// Date filter
fetchAndSaveLeads("2025/11/01", "2025/11/14");