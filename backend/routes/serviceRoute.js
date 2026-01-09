import express from "express";
import ContactMessage from "../models/servicesContact.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

console.log("=== EMAIL CONFIG DEBUG ===");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS length:",
  process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
);

// Function to create transporter with retry logic
const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    return transporter;
  } catch (error) {
    console.error("Failed to create transporter:", error);
    return null;
  }
};

// Test email configuration with better error handling
const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.error("❌ Failed to create email transporter");
      return false;
    }

    console.log("Testing email connection...");

    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("❌ Email server connection failed:", error.message);
          console.error("Error code:", error.code);

          // Provide specific troubleshooting tips
          if (error.code === "EAUTH") {
            console.error("\n🔧 TROUBLESHOOTING AUTHENTICATION:");
            console.error(
              "1. Make sure 2-Step Verification is enabled on your Google account"
            );
            console.error(
              "2. Generate an App Password at: https://myaccount.google.com/apppasswords"
            );
            console.error(
              "3. Select 'Mail' and your device, then use the 16-character password"
            );
            console.error("4. Don't use your regular Gmail password!");
          } else if (
            error.code === "ECONNECTION" ||
            error.message.includes("Connection closed")
          ) {
            console.error("\n🔧 TROUBLESHOOTING CONNECTION:");
            console.error("1. Try port 465 with secure: true");
            console.error(
              "2. Check if your firewall/antivirus is blocking the connection"
            );
            console.error("3. Try enabling 'Less Secure Apps' (temporarily)");
          }

          reject(error);
        } else {
          console.log("✅ Email server is ready to send messages");
          resolve(success);
        }
      });
    });

    return true;
  } catch (error) {
    console.error("Email connection test failed:", error.message);
    return false;
  }
};

// Alternative transporter for testing
const createAlternativeTransporter = () => {
  console.log("Trying alternative configuration...");

  // Try different configurations
  const configs = [
    {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
    {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      requireTLS: true,
    },
  ];

  for (const config of configs) {
    try {
      console.log(
        `Trying config: ${config.host}:${config.port} (secure: ${config.secure})`
      );
      const transporter = nodemailer.createTransport(config);
      return transporter;
    } catch (error) {
      console.log(
        `Config ${config.host}:${config.port} failed:`,
        error.message
      );
    }
  }

  return null;
};

// Initialize email on startup
let emailEnabled = false;
(async () => {
  console.log("Initializing email service...");

  // Try main configuration
  emailEnabled = await testEmailConnection();

  // If main config fails, try alternative
  if (!emailEnabled) {
    console.log("\nTrying alternative email configuration...");
    const altTransporter = createAlternativeTransporter();
    if (altTransporter) {
      try {
        await altTransporter.verify();
        console.log("✅ Alternative email configuration successful!");
        emailEnabled = true;
      } catch (error) {
        console.error(
          "❌ Alternative configuration also failed:",
          error.message
        );
      }
    }
  }

  if (emailEnabled) {
    console.log("✅ Email service is enabled");
  } else {
    console.warn(
      "⚠️  Email service is disabled - forms will still save to database"
    );
    console.warn("   Contact notifications will not be sent via email");
  }
})();

// Send email notification to ADMIN
const sendEmailNotification = async (contactData) => {
  if (!emailEnabled) {
    console.log("Email service disabled, skipping email notification");
    return false;
  }

  try {
    const transporter = createTransporter() || createAlternativeTransporter();
    if (!transporter) {
      console.error("No valid email transporter available");
      return false;
    }

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: contactData.email,
      subject: `📨 New Contact Form - ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #d97706;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone}</p>
          <p><strong>Message:</strong> ${contactData.message}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Contact form email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return false;
  }
};

// Submit contact form
router.post("/contact/submit", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    console.log("📝 Received form submission:", { name, email, phone });

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      message,
    });

    const savedMessage = await contactMessage.save();
    console.log("💾 Saved to MongoDB with ID:", savedMessage._id);

    // Try to send email notification
    let emailSent = false;
    try {
      emailSent = await sendEmailNotification(savedMessage);
      console.log("📧 Email sending result:", emailSent ? "Success" : "Failed");
    } catch (emailError) {
      console.error("Email notification failed:", emailError.message);
      // Continue even if email fails
    }

    // Update the document with email status
    if (emailSent) {
      savedMessage.emailSent = true;
      savedMessage.emailSentAt = new Date();
      await savedMessage.save();
    }

    res.status(201).json({
      success: true,
      message: "Message submitted successfully! We will contact you soon.",
      data: {
        id: savedMessage._id,
        name: savedMessage.name,
        email: savedMessage.email,
        submittedAt: savedMessage.createdAt,
        emailNotification: emailSent ? "sent" : "not_sent",
      },
    });
  } catch (error) {
    console.error("❌ Error submitting contact form:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});



export default router;
