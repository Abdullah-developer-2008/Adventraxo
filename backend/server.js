const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. Configure Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/deploy-strategy', (req, res) => {
    const { fullName, company, email, adSpend, goal } = req.body;

    // 2. High-Performance HTML Email Template
    const mailOptions = {
        from: '"AdventreXo Portal" <system@adventrexo.com>',
        to: 'leadcarecommunication@gmail.com',
        subject: `🚀 New Global Expansion Lead: ${company}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 20px; padding: 40px; color: #111;">
                <h2 style="color: #ff6a00; font-size: 24px; margin-bottom: 5px;">New Growth Lead Received</h2>
                <p style="color: #666; margin-bottom: 30px;">Expansion Protocol Initialized from AdventreXo Portal.</p>
                
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f4f4f4; color: #888; text-transform: uppercase; font-size: 11px; font-weight: bold; letter-spacing: 1px;">Full Name</td>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f4f4f4; font-weight: 600;">${fullName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f4f4f4; color: #888; text-transform: uppercase; font-size: 11px; font-weight: bold; letter-spacing: 1px;">Company</td>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f4f4f4; font-weight: 600;">${company}</td>
                    </tr>
                    <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f4f4f4; color: #888; text-transform: uppercase; font-size: 11px; font-weight: bold; letter-spacing: 1px;">Email Address</td>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f4f4f4; font-weight: 600; color: #ff6a00;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f4f4f4; color: #888; text-transform: uppercase; font-size: 11px; font-weight: bold; letter-spacing: 1px;">Ad Spend</td>
                        <td style="padding: 15px 0; border-bottom: 1px solid #f4f4f4; font-weight: 600;"><span style="background: #fff0e6; color: #ff6a00; padding: 4px 10px; border-radius: 10px;">${adSpend}</span></td>
                    </tr>
                </table>

                <div style="margin-top: 30px;">
                    <h4 style="text-transform: uppercase; font-size: 11px; color: #888; margin-bottom: 10px;">Expansion Targets</h4>
                    <p style="background: #fbfbfd; padding: 20px; border-radius: 15px; font-style: italic; line-height: 1.6; color: #444;">"${goal}"</p>
                </div>

                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #aaa; text-align: center;">
                    &copy; 2026 AdventreXo Intelligence Engine • Automatic Transmission
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: error.toString() });
        }
        res.status(200).json({ success: true, message: 'Strategy Deployed!' });
    });
});

// --- New Endpoint for Footer Email Opt-in ---
app.post('/footer-lead', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: '"AdventreXo Leads" <system@adventrexo.com>',
        to: 'leadcarecommunication@gmail.com',
        subject: `⚡ Quick Lead: Strategy Audit Requested`,
        html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: auto; border: 2px solid #ff6a00; border-radius: 15px; padding: 30px;">
                <h3 style="color: #111; margin-top: 0;">New Strategy Audit Request</h3>
                <p style="color: #555;">A user has requested a strategy audit via the footer CTA.</p>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
                    <span style="display: block; font-size: 12px; color: #888; text-transform: uppercase; margin-bottom: 5px;">Prospect Email</span>
                    <strong style="font-size: 18px; color: #ff6a00;">${email}</strong>
                </div>

                <p style="font-size: 12px; color: #aaa; text-align: center;">
                    Source: Footer CTA Section • AdventreXo Global
                </p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).json({ success: false });
        res.status(200).json({ success: true, message: 'Lead captured!' });
    });
});

module.exports = app;