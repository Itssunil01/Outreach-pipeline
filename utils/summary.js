const inquirer = require("inquirer").default;

async function showSummary(leads) {

  console.table(
    leads.map((lead) => ({
      Name: lead.name,
      Company: lead.company,
      Email: lead.email,
    }))
  );

  const answer = await inquirer.prompt([
    {
      type: "confirm",
      name: "send",
      message:
        "Do you want to send these emails?",
      default: false,
    },
  ]);

  return answer.send;
}

module.exports = {
  showSummary,
};