// var API = require('indian-stock-exchange');
const serverless = require("serverless-http");
var express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var admin = require("firebase-admin");
require("dotenv").config();

var serviceAccount = require("./firebase-private");
const strategyController = require("./controllers/strategy");
const {
  createPortfolio,
  addStock,
  getPortfolioForUser,
  removeStock,
  getPortfolioById,
  deletePortfolio,
} = require("./controllers/virtualPortfolio");
const PORT = process.env.PORT || 7000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const authorizeMiddleware = async function (req, res, next) {
  if (req.path === "/") {
    return next();
  }
  const token = req.headers.token;
  try {
    const auth = await admin.auth().verifyIdToken(token);
    res.locals.auth = auth;
    next();
  } catch (error) {
    // Handle error
    // handleError(error);
    const err = new Error("you could not be authorized");
    err.status = 401;
    next(err);
  }
};

var app = express();
app.use(cors());
app.use(express.json());
app.all("*", authorizeMiddleware);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
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
app.post("/virtual_portfolio/add-stock", addStock);
app.get("/virtual_portfolio/get-portfolio", getPortfolioForUser);
app.post("/virtual_portfolio/remove-stock", removeStock);
app.post("/virtual_portfolio/delete", deletePortfolio);
app.post("/virtual_portfolio/get-portfolio-by-id", getPortfolioById);
app.post("/strategy/add", strategyController.saveStrategy);
app.get("/strategy/get/:strategy", strategyController.getStrategy);
app.get("/strategy/all", strategyController.getAllStrategies);
app.get("/", (req, res) => {
  res.send("Hello, Test Automated Deployment using Code Pipeline");
});
module.exports.handler = serverless(app);
