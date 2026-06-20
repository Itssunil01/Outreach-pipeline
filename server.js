require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  findSimilarCompanies
} = require("./services/oceanService");

const {
  findDecisionMakers
} = require("./services/prospeoService");

const {
  sendEmails
} = require("./services/brevoService");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Outreach API Running"
  });
});

app.post(
  "/api/find-leads",
  async (req, res) => {

    try {

      const { domain } = req.body;

      const companies =
        await findSimilarCompanies(
          domain
        );

      const contacts =
        await findDecisionMakers(
          companies
        );

      res.json({
        companies,
        contacts
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);

// app.post(
//   "/api/send-emails",
//   async (req, res) => {

//     try {

//       const { leads } = req.body;

//       await sendEmails(leads);

//       res.json({
//         success: true
//       });

//     } catch (error) {

//       res.status(500).json({
//         error: error.message
//       });

//     }
//   }
// );

app.post(
  "/api/send-emails",
  async (req, res) => {

    try {

      const { leads } = req.body;

      // DEMO MODE
      if (
        process.env.DEMO_MODE === "true"
      ) {

        console.log(
          "\n DEMO MODE ENABLED"
        );

        console.log(
          `Would send ${leads.length} emails`
        );

        return res.json({
          success: true,
          demo: true,
          sentCount: leads.length,
          message:
            "Demo Mode Enabled - No emails were sent"
        });

      }

      // REAL MODE
      await sendEmails(leads);

      res.json({
        success: true,
        demo: false
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);

app.listen(
  5000,
  () => {
    console.log(
      "Server running on port 5000"
    );
  }
);