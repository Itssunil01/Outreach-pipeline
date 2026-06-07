require("dotenv").config();
const axios = require("axios");

async function findDecisionMakers(companies) {
  const contacts = [];

  for (const domain of companies) {
    console.log(`\n Searching contacts for ${domain}`);

    try {
      const response = await axios.post(
        "https://api.prospeo.io/search-person",
        {
          page: 1,
          filters: {
            company: {
              websites: {
                include: [domain],
              },
            },
          },
        },
        {
          headers: {
            "X-KEY": process.env.PROSPEO_KEY,
            "Content-Type": "application/json",
          },
        },
      );

      const people = response.data.results || [];

      // Prefer decision makers
      const decisionMakers = people.filter((item) => {
        const title = (item.person?.current_job_title || "").toLowerCase();

        return (
          title.includes("ceo") ||
          title.includes("founder") ||
          title.includes("director") ||
          title.includes("vp") ||
          title.includes("head") ||
          title.includes("manager")
        );
      });

      const selectedPeople =
        decisionMakers.length > 0 ? decisionMakers : people;

      for (const item of selectedPeople.slice(0, 5)) {
        contacts.push({
          name: item.person?.full_name || "Unknown",

          title: item.person?.current_job_title || "Unknown",

          linkedin: item.person?.linkedin_url || "",

          company: item.company?.domain || domain,

          email: item.person?.email?.email || null,
        });
      }
    } catch (error) {
      console.log(`\n Prospeo Error for ${domain}`);

      console.error(error.response?.data || error.message);
    }
  }

  console.log(`\n Total Contacts Collected: ${contacts.length}`);

  return contacts;
}

module.exports = {
  findDecisionMakers,
};
