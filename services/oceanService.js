require("dotenv").config();
const axios = require("axios");

async function findSimilarCompanies(domain) {
  try {
    console.log("\n Looking up company profile...");

    const lookupResponse = await axios.post(
      "https://api.ocean.io/v2/lookup/companies",
      {
        domains: [domain],
      },
      {
        headers: {
          "X-Api-Token": process.env.OCEAN_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    const company = lookupResponse.data.companies[0];

    console.log(`Found ${company.name}`);

    console.log("\n Searching lookalikes...");

    const searchResponse = await axios.post(
      "https://api.ocean.io/v3/search/companies",
      {
        companiesFilters: {
          industries: company.industries.slice(0, 2),

          companySizes: [company.companySize],
        },
        size: 10,
      },
      {
        headers: {
          "X-Api-Token": process.env.OCEAN_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    return searchResponse.data.companies
      .map((item) => item.company.domain)
      .filter((d) => d !== domain);
  } catch (error) {
    console.log(error.response?.data || error.message);

    return [];
  }
}

module.exports = {
  findSimilarCompanies,
};
