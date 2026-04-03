const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SSAG Backend Running");
});

app.get("/api/data", (req, res) => {
  res.json({
    message: "SSAG System Active",
    deals: 12,
    revenue: 45000
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
