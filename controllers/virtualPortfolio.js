const VirtualPortfolio = require("../models/VirtualPortfolio");
// export const addStock = ({ userId }) => {};

exports.createPortfolio = (req, res) => {
  VirtualPortfolio.create(req.body, function (err, doc) {
    if (err) return handleError(err);
    return res.send(doc);
  });
};

exports.addStock = (req, res) => {
  VirtualPortfolio.findOneAndUpdate(
    { _id: req.body.portfolioId },
    { $push: { stocks: { $each: req.body.stocks } } },
    { returnDocument: "after" },
    function (err, doc) {
      if (err) return console.log(err);
      return res.send(doc);
    }
  );
};

exports.getPortfolioForUser = (req, res) => {
  VirtualPortfolio.find({ user: req.body.user }, function (err, doc) {
    if (err) return handleError(err);
    return res.send(doc);
  });
};
exports.removeStock = (req, res) => {
  console.log(req.body.symbol);
  VirtualPortfolio.findOneAndUpdate(
    { _id: req.body.portfolioId },
    {
      $pull: {
        stocks: { symbol: req.body.symbol },
      },
    },
    function (err, doc) {
      if (err) return console.log(err);
      return res.send(doc);
    }
  );
};
exports.getPortfolioById = (req, res) => {
  VirtualPortfolio.find({ _id: req.body.portfolioId }, function (err, doc) {
    if (err) return console.log(err);
    return res.send(doc);
  });
};
