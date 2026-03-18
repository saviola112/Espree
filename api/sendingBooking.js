const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fullName, phone, email, service, date, address, notes } = req.body;

    if (!fullName || !phone || !email || !service || !date || !address) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Booking Request - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Booking Request</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Preferred Date:</strong> ${date}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Additional Notes:</strong> ${notes || "None"}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Booking email sent successfully.",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({
      message: "Something went wrong while sending the email.",
    });
  }
};
