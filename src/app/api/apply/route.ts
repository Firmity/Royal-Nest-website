import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb", // adjust if needed
    },
  },
};

export async function POST(request: Request) {
  try {
    // Parse JSON body (no multipart yet)
    const data = await request.json();

    const { name, email, phone, designation } = data;

    // Validate required fields
    if (!name || !email || !phone || !designation) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Career Application from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDesignation: ${designation}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Application sent!" });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send application." },
      { status: 500 }
    );
  }
}
