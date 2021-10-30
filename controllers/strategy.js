const urls = require("../constants/urls");
const axios = require("axios");
const csvTojs = require("../utils/csv2Json");
const Strategy = require("../models/StrategyData");

function getStocksByStrategy(strategy) {
  const url = getStrategyUrl(strategy);
  return axiosTransformer(url);
}

const saveStrategy = (req, res) => {
  Strategy.create(req.body, function (err, doc) {
    if (err) return console.log(err);
    return res.send(doc);
  });
};

const getStrategy = (req, res) => {
  Strategy.findOne({ name: req.params.strategy }, function (err, doc) {
    if (err) return console.log(err);
    return res.send(doc);
  });
};

const getAllStrategies = (req, res) => {
  console.log("get all strategies");
  Strategy.find({}, function (err, doc) {
    if (err) return console.log(err);
    console.log(doc);
    return res.send(doc);
  });
};

function getStrategyUrl(strategy) {
  switch (strategy.toLowerCase()) {
    case "low_volatility":
      return urls.LOW_VOLATILITY_30;
    case "midcap":
      return urls.MIDCAP_QUALITY_50;
    case "momentum":
      return urls.MOMENTUM_30;
    case "alpha":
      return urls.MIDCAP_QUALITY_50;
  }
}

function axiosTransformer(url, headers) {
  return axios.get(url, {
    transformResponse: [
      function (data) {
        return csvTojs(data, headers || null);
      },
    ],
  });
}

const StrategyController = {
  getStocksByStrategy,
  saveStrategy,
  getStrategy,
  getAllStrategies,
};

module.exports = StrategyController;
