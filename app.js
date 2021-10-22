// var API = require('indian-stock-exchange');
var express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const strategyController = require("./controllers/strategy");
const {
  createPortfolio,
  addStock,
  getPortfolioForUser,
  removeStock,
  getPortfolioById,
} = require("./controllers/virtualPortfolio");
const PORT = process.env.PORT || 7000;

var app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

app.get("/strategy/get-stocks/:strategy", (req, res, next) => {
  strategyController
    .getStocksByStrategy(req.params.strategy)
    .then(function (response) {
      res.json(response.data);
    });
});

app.post("/virtual_portfolio/create", createPortfolio);
app.post("/virtual_portfolio/addStocks", addStock);
app.post("/virtual_portfolio/getPortfolios", getPortfolioForUser);
app.post("/virtual_portfolio/removeStock", removeStock);
app.post("/virtual_portfolio/getPortfolioById", getPortfolioById);
app.post("/strategy/add", strategyController.saveStrategy);
app.get("/strategy/get/:strategy", strategyController.getStrategy);
app.get("/strategy/all", strategyController.getAllStrategies);
app.get("/", (req, res) => {
  res.send("Hello, Test Automated Deployment using Code Pipeline");
});
module.exports = app;
