const express = require("express");
const router = express.Router();

// Mock market updates data
const marketUpdates = [
  { action: "Bought", amount: 50, asset: "Bitcoin" },
  { action: "Sold", amount: 30, asset: "Apple" },
  { action: "Bought", amount: 20, asset: "Ethereum" },
];

// GET /api/market-updates
router.get("/", (req, res) => {
  res.json(marketUpdates);
});

module.exports = router;
