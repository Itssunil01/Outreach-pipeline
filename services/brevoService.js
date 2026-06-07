const fs = require("fs");
const path = require("path");
require("dotenv").config();
const axios = require("axios");

async function sendEmails(leads) {
  for (const lead of leads) {
    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "Sunil",
            email: process.env.SENDER_EMAIL,
          },

          to: [
            {
              email: lead.email,
              name: lead.name,
            },
          ],

          subject: `Quick Question for ${lead.name}`,

          htmlContent: `
  <p>Hi ${lead.name},</p>

  <p>
    I came across your profile and noticed that you're working as
    <strong>${lead.title}</strong> at
    <strong>${lead.company}</strong>.
  </p>

  <p>
    I am a Software Development Engineer currently working on
    outreach automation and lead generation projects.
  </p>

  <p>
    I would love to connect and learn more about your experience and work.
  </p>

  <p>
    Looking forward to hearing from you.
  </p>

  <br>

  <p>
    Regards,<br>
    Sunil Kumar Bal
  </p>
`,
        },
        {
          headers: {
            "api-key": process.env.BREVO_KEY,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(` Sent to ${lead.email}`);

      const sentEmail = {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        title: lead.title,
        sentAt: new Date().toISOString(),
      };

      const dataDir = path.join(__dirname, "../data");

      const filePath = path.join(dataDir, "sentEmails.json");

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      let existingEmails = [];

      if (fs.existsSync(filePath)) {
        existingEmails = JSON.parse(fs.readFileSync(filePath, "utf8"));
      }

      existingEmails.push(sentEmail);

      fs.writeFileSync(filePath, JSON.stringify(existingEmails, null, 2));
    } catch (error) {
      console.log(` Failed for ${lead.email}`);

      console.log(error.response?.data || error.message);
    }
  }
}

module.exports = {
  sendEmails,
};
