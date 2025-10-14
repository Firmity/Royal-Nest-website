import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";
import { tmpdir } from "os";

export const runtime = "nodejs"; // Ensure Node APIs are available

export async function POST(req: Request) {
  try {
    // Parse FormData directly
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const designation = formData.get("designation") as string;
    const resume = formData.get("resume") as File | null;

    if (!name || !email || !phone || !designation) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save resume temporarily if uploaded
    let resumePath: string | null = null;
    if (resume) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      const tempPath = path.join(tmpdir(), resume.name);
      await fs.writeFile(tempPath, buffer);
      resumePath = tempPath;
    }

    // Configure mail transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions: any = {
      from: process.env.EMAIL_USER,
      to: [process.env.EMAIL_USER ?? "", "Nest.atal@gmail.com"],
      replyTo: email,
      subject: `New Career Application from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDesignation: ${designation}`,
    };

    if (resumePath) {
      mailOptions.attachments = [
        {
          filename: resume?.name ?? "resume",
          path: resumePath,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    // Cleanup
    if (resumePath) await fs.unlink(resumePath);

    return NextResponse.json({ success: true, message: "Application sent successfully!" });
  } catch (error) {
    console.error("Career API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send application." },
      { status: 500 }
    );
  }
}
