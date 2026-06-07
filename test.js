require("dotenv").config();
const axios = require("axios");

async function testBrevo() {
  try {

    const response = await axios.get(
      "https://api.brevo.com/v3/account",
      {
        headers: {
          "api-key": process.env.BREVO_KEY
        }
      }
    );

    console.log("Connected Successfully");
    console.log(response.data.email);

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

  }
}

testBrevo();