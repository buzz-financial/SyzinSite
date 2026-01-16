import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

//Request setup and handling.
dotenv.config();
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  next();
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//To fix weird issue where valid requests dropped the ".html".
app.use(express.static(path.join(__dirname, "public"), {
  extensions: ["html"],
}));

//Email sending code, uses .env as parameters.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const lastSubmissionByIp = new Map();
app.post("/api/contact", async (req, res) => {
  const ip = req.ip;
  const now = Date.now();
  const lastTime = lastSubmissionByIp.get(ip) || 0;
  if (now - lastTime < 30_000) {
    console.log("Rate Limited.");
    return res.status(429).json({
      error: "Rate Limited.",
    });
  }
  lastSubmissionByIp.set(ip, now);
  try {
    const { name, email, phone, company, partnership, ref, industry, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }
    console.log(req.body);
    await transporter.sendMail({
      from: `"Syzin Website Form" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `Syzin Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nPartnership Type: ${partnership}\nReferred by: ${ref}\nIndustry: ${industry}\n\n${message}`,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email failed" });
  }
});



app.listen(3000, () => console.log("Server running"));
