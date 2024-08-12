const axios = require("axios");

const DASHBOARD_API_URL = "http://95.85.121.153:3066/api/get-dashboard";
const CARD_DATA_API_URL = "http://95.85.121.153:3066/api/get-card-data";

const fetchDashboardData = async () => {
  try {
    const response = await axios.get(DASHBOARD_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
};

const fetchCardData = async () => {
  try {
    const response = await axios.get(CARD_DATA_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching card data:", error);
    return [];
  }
};

module.exports = { fetchDashboardData, fetchCardData };
