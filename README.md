# Portfolio Dashboard

A sleek, responsive, and interactive dashboard to monitor and analyze your investment portfolio, including key metrics, strategy comparisons, recent trades, and portfolio growth over time. This project showcases a full-stack application built with React for the frontend, using Chart.js for visualizations, and Axios for API integration to fetch live data.

## Features

- **Real-time Portfolio Metrics**: Displays total portfolio value, daily P&L, and win rate.
- **Date Range Filter**: Filter strategies based on a custom date range.
- **Sort by ROI**: Sort strategies by their Return on Investment (ROI).
- **Strategy Comparison**: Compare multiple strategies side-by-side with metrics like ROI, CAGR, and Drawdown.
- **Interactive Charts**: Visualize portfolio allocation and growth over time using Pie and Line charts powered by Chart.js.
- **Recent Trades**: View the latest market trades with real-time updates.

## Tech Stack

- **Frontend**: 
  - React.js
  - Chart.js
  - Framer Motion (for smooth animations)
  - Axios (for API requests)

- **Backend**:
  - Node.js(with express) (for handling the API requests)

- **Data Source**:
  - The project fetches data from a mock API for portfolio information, market updates, and strategies.

## Setup Instructions

To run this project locally, follow these steps:

### 1. Clone the repository:
  git clone https://github.com/rohit-3003/portfolio-dashboard.git

### 2. Navigate to the project folder:
  cd portfolio-dashboard
  cd padfrontend
  
### 3. Install the dependencies:
  npm install
  
### 4. Start the development server:
  npm start
Visit http://localhost:3000 in your browser to view the dashboard.

### API Integration
The dashboard fetches data from an API running on a local server. You can set up the API using the following steps:

### 1. Clone the backend repository:
  git clone https://github.com/rohit-3003/portfolio-dashboard.git
  
### 2. Install dependencies in the backend folder:
  cd padbackend
  npm install
### 3. Start the server:
  npm start
Make sure your backend server is running on http://localhost:5000.
