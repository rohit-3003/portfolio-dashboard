const express = require("express");
const router = express.Router();

// Mock portfolio data
const portfolioData = {
  totalValue: 100000,
  dailyPnL: 500,
  winRate: 80, // Win rate in percentage
  allocation: {
    stocks: 50000,
    bonds: 30000,
    crypto: 20000,
  },
};

// GET /api/portfolio
router.get("/", (req, res) => {
  res.json(portfolioData);
});

module.exports = router;
