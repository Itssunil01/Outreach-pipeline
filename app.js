require("dotenv").config();

const fs = require("fs");
const path = require("path");

const inquirer = require("inquirer").default;

const { findSimilarCompanies } = require("./services/oceanService");

const { findDecisionMakers } = require("./services/prospeoService");

console.log("findDecisionMakers =", findDecisionMakers);

// const {
//   resolveEmails,
// } = require("./services/eazyreachService");

const { sendEmails } = require("./services/brevoService");

const { showSummary } = require("./utils/summary");

async function main() {
  try {
    console.clear();

    console.log("\n====================================");
    console.log(" AUTOMATED OUTREACH PIPELINE");
    console.log("====================================\n");

    const input = await inquirer.prompt([
      {
        type: "input",
        name: "domain",
        message: "Enter company domain:",
      },
    ]);

    const domain = input.domain.trim();

    if (!domain) {
      console.log(" Domain cannot be empty");
      return;
    }

    // ====================================
    // OCEAN
    // ====================================

    console.log("\n Finding similar companies...\n");

    let companies = await findSimilarCompanies(domain);

    // TEMPORARY LIMIT
    companies = companies.slice(0, 5);

    console.log("====================================");

    console.log("SIMILAR COMPANIES");

    console.log("====================================");

    companies.forEach((company, index) => {
      console.log(`${index + 1}. ${company}`);
    });

    // ====================================
    // PROSPEO
    // ====================================

    console.log("\n Finding decision makers...\n");

    const contacts = await findDecisionMakers(companies);

    console.log("====================================");

    console.log("DECISION MAKERS");

    console.log("====================================");

    contacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.name}`);

      console.log(`   Title    : ${contact.title}`);

      console.log(`   Company  : ${contact.company}`);

      console.log(`   LinkedIn : ${contact.linkedin}`);

      console.log(`   Email    : ${contact.email || "Not Available"}`);

      console.log("");
    });

    // ====================================
    // EAZYREACH
    // ====================================

    console.log("\n Resolving work emails...\n");

    const leads = contacts.filter((contact) => contact.email);

    // const leads = [
    //   {
    //     name: "Sunil Bal",
    //     email: "sunilkumarbalp@gmail.com",
    //   },
    // ];

    console.log("====================================");

    console.log("EMAILS FOUND");

    console.log("====================================");

    leads.forEach((lead, index) => {
      console.log(`${index + 1}. ${lead.name}`);

      console.log(`   Email : ${lead.email || "Not Found"}`);

      console.log("");
    });

    // ====================================
    // SAVE JSON
    // ====================================

    const dataDir = path.join(__dirname, "data");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    fs.writeFileSync(
      path.join(dataDir, "leads.json"),
      JSON.stringify(leads, null, 2),
    );

    console.log("\n Leads saved to data/leads.json");

    // ====================================
    // SUMMARY
    // ====================================

    console.log("\n====================================");

    console.log("SUMMARY");

    console.log("====================================");

    console.log(`Companies Found     : ${companies.length}`);

    console.log(`Decision Makers     : ${contacts.length}`);

    console.log(`Verified Emails : ${leads.length}`);

    console.log("====================================");

    const approved = await showSummary(leads);

    if (!approved) {
      console.log("\n Email sending cancelled.");

      return;
    }

    // ====================================
    // BREVO
    // ====================================

    console.log("\n Sending emails...\n");

    await sendEmails(leads);

    console.log("\n====================================");

    console.log(" PIPELINE COMPLETED SUCCESSFULLY");

    console.log("====================================\n");
  } catch (error) {
    console.log("\n PIPELINE FAILED");

    console.error(error);
  }
}

main();
