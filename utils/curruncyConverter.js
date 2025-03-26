

const axios = require("axios");

exports.ConvertCurrency = async (from,to,amount) => {

    const API_KEY = process.env.EXCHANGE_API_KEY;
const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

    try {
        if (!from || !to || !amount) {
            throw new Error("Missing required parameters");
        }

        from = from.toUpperCase();
        to = to.toUpperCase();

        const response = await axios.get(`${API_URL}&base=${from}`);

        if (response.data.error) {
            throw new Error(`API Error: ${response.data.error.info}`);
        }

        const rate = response.data.rates[to];

        if (!rate) {
            throw new Error("Invalid currency codes");
        }

        const convertedAmount = amount * rate;

        return convertedAmount;

    } catch (error) {
        throw new Error("Error fetching conversion rate: " + error.message);
    }
}