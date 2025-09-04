import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    let department = formData.get("department")?.toString() || "";
    const description = formData.get("describe")?.toString() || "";

    if (department === "Other") {
      const departmentOther = formData.get("departmentOther")?.toString() || "";
      department = departmentOther || "";
    }

    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !phone || !department || !description || !resumeFile) {
      return NextResponse.json(
        { success: false, message: "Missing required fields or resume" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await resumeFile.arrayBuffer());

    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailText = `Name: ${name}
Email: ${email}
Phone: ${phone}
Department: ${department}
Description: ${description}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Career Application from ${name}`,
      text: mailText,
      attachments: [
        {
          filename: resumeFile.name || "resume",
          content: buffer,
          contentType: resumeFile.type || "application/octet-stream",
        },
      ],
    });

    return NextResponse.json({ success: true, message: "Application sent!" });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process application." },
      { status: 500 }
    );
  }
}
