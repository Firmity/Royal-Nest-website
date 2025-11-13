import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, phone, city } = await req.json();

    if (!name || !email || !phone || !city) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // -----------------------------------
    // 🔹 1. SAVE TO GOOGLE SHEETS
    // -----------------------------------
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            name,
            email,
            phone,
            city,
            new Date().toLocaleString(),
          ],
        ],
      },
    });

    // -----------------------------------
    // 🔹 2. SEND EMAIL NOTIFICATION
    // -----------------------------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: [process.env.EMAIL_USER ?? "", "richu@ufirm.in"],
      subject: "New Brochure Request",
      text: `
New Brochure Request Received:

Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city}

Saved automatically to Google Sheet ✔
      `,
    });

    return NextResponse.json({ success: true, message: "Lead saved + email sent" });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed", error: error.message },
      { status: 500 }
    );
  }
}
