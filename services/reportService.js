const cron = require("node-cron");
const { fetchDashboardData, fetchCardData } = require("./dataService");
const sendEmail = require("./emailService");
const generateReportText = require("../utils/reportGenerator");

const sendDailyReport = async () => {
  const dashboardData = await fetchDashboardData();
  const cardData = await fetchCardData();

  // List of email recipients
  const recipients = ["microsoft7779@gmail.com", "astankulov.maksat@gmail.com"];

  if (dashboardData && cardData) {
    const reportText = generateReportText(dashboardData, cardData);
    await sendEmail(
      recipients.join(", "), // Join the emails into a comma-separated string
      "Daily Dashboard Report",
      reportText
    );
  } else {
    await sendEmail(
      recipients.join(", "), // Join the emails into a comma-separated string
      "Daily Dashboard Report",
      "Failed to fetch dashboard data or card data."
    );
  }
};

// Schedule the daily report to run every day at 9:00 AM
cron.schedule("0 9 * * *", () => {
  sendDailyReport();
});

// Send an initial report immediately
sendDailyReport();
