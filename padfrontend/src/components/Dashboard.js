import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

// Register necessary Chart.js components
ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [trades, setTrades] = useState([]);
  const [filteredStrategies, setFilteredStrategies] = useState([]);
  const [filterDateRange, setFilterDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedStrategies, setSelectedStrategies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const portfolioRes = await axios.get("http://localhost:5000/api/portfolio");
      const strategiesRes = await axios.get("http://localhost:5000/api/strategies");
      const tradesRes = await axios.get("http://localhost:5000/api/market-updates");

      setPortfolio(portfolioRes.data);
      setStrategies(strategiesRes.data);
      setTrades(tradesRes.data);
      setFilteredStrategies(strategiesRes.data);
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterDateRange({ ...filterDateRange, [name]: value });
  };

  const applyDateFilter = () => {
    if (filterDateRange.startDate && filterDateRange.endDate) {
      const filtered = strategies.filter((strategy) => {
        const strategyDate = new Date(strategy.date);
        return (
          strategyDate >= new Date(filterDateRange.startDate) &&
          strategyDate <= new Date(filterDateRange.endDate)
        );
      });
      setFilteredStrategies(filtered);
    }
  };

  const handleSortByPerformance = () => {
    const sorted = [...filteredStrategies].sort((a, b) => b.roi - a.roi);
    setFilteredStrategies(sorted);
  };

  const handleSelectStrategy = (strategy) => {
    setSelectedStrategies((prevSelected) => {
      if (prevSelected.includes(strategy)) {
        return prevSelected.filter((s) => s !== strategy);
      } else {
        return [...prevSelected, strategy];
      }
    });
  };

  if (!portfolio) return <div>Loading...</div>;

  const pieData = {
    labels: Object.keys(portfolio.allocation),
    datasets: [
      {
        data: Object.values(portfolio.allocation),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Portfolio Growth",
        data: [90000, 95000, 98000, 99000, portfolio.totalValue],
        borderColor: "#42A5F5",
        pointBackgroundColor: "#FF6384", // Custom point color
        fill: false,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <motion.h1
        className="text-center text-4xl font-bold mb-12 text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Portfolio Analytics Dashboard
      </motion.h1>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <motion.div
          className="card bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-2xl font-semibold">Total Portfolio Value</h3>
          <p className="text-xl">${portfolio.totalValue.toLocaleString()}</p>
        </motion.div>
        <motion.div
          className="card bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-2xl font-semibold">Daily P&L</h3>
          <p className="text-xl">${portfolio.dailyPnL}</p>
        </motion.div>
        <motion.div
          className="card bg-yellow-500 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-2xl font-semibold">Win Rate</h3>
          <p className="text-xl">{portfolio.winRate}%</p>
        </motion.div>
      </div>

      {/* Filtering and Sorting Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Filter by Date Range</h3>
        <div className="flex gap-4">
          <label className="flex flex-col">
            Start Date:
            <input
              type="date"
              name="startDate"
              value={filterDateRange.startDate}
              onChange={handleFilterChange}
              className="border rounded-lg p-2"
            />
          </label>
          <label className="flex flex-col">
            End Date:
            <input
              type="date"
              name="endDate"
              value={filterDateRange.endDate}
              onChange={handleFilterChange}
              className="border rounded-lg p-2"
            />
          </label>
          <button
            onClick={applyDateFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Apply Filter
          </button>
          <button
            onClick={handleSortByPerformance}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
          >
            Sort by ROI
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="flex justify-around gap-6 mb-12">
        <motion.div
          className="w-full sm:w-1/2 lg:w-2/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Allocation by Asset Class</h3>
          <Pie data={pieData} />
        </motion.div>
        <motion.div
          className="w-full sm:w-1/2 lg:w-3/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Portfolio Growth</h3>
          <Line data={lineData} />
        </motion.div>
      </div>

      {/* Strategy Comparison Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Select Strategies to Compare</h3>
        <div className="space-y-4">
          {filteredStrategies.map((strategy) => (
            <div key={strategy.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedStrategies.includes(strategy)}
                onChange={() => handleSelectStrategy(strategy)}
                className="h-4 w-4"
              />
              <span>{strategy.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedStrategies.length > 1 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Strategy Comparison</h3>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Metric</th>
                {selectedStrategies.map((strategy) => (
                  <th key={strategy.name} className="border px-4 py-2">
                    {strategy.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">ROI (%)</td>
                {selectedStrategies.map((strategy) => (
                  <td key={strategy.name} className="border px-4 py-2">{strategy.roi}</td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">CAGR (%)</td>
                {selectedStrategies.map((strategy) => (
                  <td key={strategy.name} className="border px-4 py-2">{strategy.cagr}</td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">Drawdown (%)</td>
                {selectedStrategies.map((strategy) => (
                  <td key={strategy.name} className="border px-4 py-2">{strategy.drawdown}</td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">Date</td>
                {selectedStrategies.map((strategy) => (
                  <td key={strategy.name} className="border px-4 py-2">
                    {new Date(strategy.date).toLocaleDateString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Recent Trades Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Trades</h3>
        <ul className="space-y-2">
          {trades.map((trade, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>{trade.action} {trade.amount} of {trade.asset}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
