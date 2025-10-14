import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, phone, city } = body;

        if (!email) {
            return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // or your SMTP host
            port: 465,
            secure: true, // SSL
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS, // app password
            },
        });

        // Send mail
        await transporter.sendMail({
            from: process.env.EMAIL_USER,      // your verified email
            replyTo: email,                     // user's email
            to: [process.env.EMAIL_USER ?? "", "Nest.atal@gmail.com"], // multiple recipients
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            html: `
    <h2>Contact Form Submission</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>City:</strong> ${city}</p>
  `,
        });

        return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
    } catch (error: unknown) {
        console.error("Email sending error:", error instanceof Error ? error.message : error);
        return new Response(
            JSON.stringify({ message: "Failed to send email", error: error instanceof Error ? error.message : "Unknown error" }),
            { status: 500 }
        );
    }
}