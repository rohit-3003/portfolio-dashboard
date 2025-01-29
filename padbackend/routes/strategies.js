const express = require("express");
const router = express.Router();

// Mock strategies data
const strategiesData = [
  {
    name: "Growth Strategy",
    roi: 15,
    cagr: 12,
    drawdown: 8,
    date: "2024-01-01",
  },
  {
    name: "Conservative Strategy",
    roi: 8,
    cagr: 6,
    drawdown: 5,
    date: "2024-02-01",
  },
  {
    name: "Aggressive Strategy",
    roi: 20,
    cagr: 18,
    drawdown: 12,
    date: "2024-03-01",
  },
];

// GET /api/strategies
router.get("/", (req, res) => {
  const { startDate, endDate } = req.query;

  let filteredStrategies = strategiesData;

  // Filter by date range if provided
  if (startDate && endDate) {
    filteredStrategies = filteredStrategies.filter((strategy) => {
      const strategyDate = new Date(strategy.date);
      return (
        strategyDate >= new Date(startDate) && strategyDate <= new Date(endDate)
      );
    });
  }

  // Sort by ROI in descending order
  filteredStrategies.sort((a, b) => b.roi - a.roi);

  res.json(filteredStrategies);
});

module.exports = router;
