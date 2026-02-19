import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendQueryEmail(queryData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    interest?: string;
    message: string;
}) {
    const { name, email, phone, company, interest, message } = queryData;

    try {
        const info = await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`, 
            to: process.env.ADMIN_EMAIL, 
            subject: `New Customer Query from ${name}`, 
            replyTo: email,
            text: `
                New Query Details:
                ------------------
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Company: ${company || "N/A"}
                Interest: ${interest || "N/A"}
                
                Message:
                ${message}
            `,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #022c75; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #022c75; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0;">New Customer Query</h1>
                    </div>
                    <div style="padding: 20px; color: #333;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Company:</strong> ${company || "N/A"}</p>
                        <p><strong>Interest:</strong> ${interest || "N/A"}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <div style="background-color: #f4f4f4; color: #777; padding: 10px; text-align: center; font-size: 12px;">
                        This query was sent from your website's contact form.
                    </div>
                </div>
            `,
        });

        console.log("Email sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
