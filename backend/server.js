const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

let deals = [];

// Root check
app.get("/", (req, res) => {
  res.send("SSAG Command Center Backend is LIVE");
});

// Add deal
app.post("/api/deals", (req, res) => {
  const { name, value, stage } = req.body;

  if (!name || value === undefined) {
    return res.status(400).json({ error: "Missing data" });
  }

  deals.push({
    name: String(name),
    value: Number(value),
    stage: stage || "Lead",
  });

  res.json({ success: true });
});

// Get deals
app.get("/api/deals", (req, res) => {
  res.json(deals);
});

// Analytics
function getAnalytics() {
  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const average = totalDeals ? totalValue / totalDeals : 0;

  const biggest = deals.reduce(
    (max, d) => (d.value > max.value ? d : max),
    { value: 0 }
  );

  return {
    totalDeals,
    totalValue,
    average,
    biggestDeal: biggest.name || "None",
  };
}

app.get("/api/analytics", (req, res) => {
  res.json(getAnalytics());
});

app.listen(PORT, () => {
  console.log("SSAG running on port " + PORT);
});
