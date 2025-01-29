const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const portfolioRouter = require("./routes/portfolio");
const strategiesRouter = require("./routes/strategies");
const marketUpdatesRouter = require("./routes/market-updates");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Define Routes
app.use("/api/portfolio", portfolioRouter);
app.use("/api/strategies", strategiesRouter);
app.use("/api/market-updates", marketUpdatesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
