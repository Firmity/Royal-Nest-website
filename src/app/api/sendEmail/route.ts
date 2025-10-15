import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, phone, city } = await req.json();

        // Create transporter (example using Gmail)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // your Gmail address
                pass: process.env.EMAIL_PASS, // your app password (not regular password)
            },
        });

        // Compose the email
        const mailOptions = {
            from: process.env.EMAIL_USER,      // your verified email
            replyTo: email,                     // user's email
            to: [process.env.EMAIL_USER ?? "", "Nest.atal@gmail.com"], // your receiving email
            subject: "New Brochure Request",
            text: `
New brochure request received:

Name: ${name}
Email: ${email}
Phone: ${phone}
City: ${city}
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Email error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
