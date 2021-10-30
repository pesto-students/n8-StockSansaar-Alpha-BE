const VirtualPortfolio = require("../models/VirtualPortfolio");

exports.createPortfolio = (req, res) => {
  VirtualPortfolio.init().then((VirtualPortfolio) => {
    VirtualPortfolio.create(req.body, function (err, doc) {
      if (err) return console.log(err);
      return res.send(doc);
    });
  });
};

exports.deletePortfolio = (req, res) => {
  VirtualPortfolio.findByIdAndRemove(req.body.id, function (err, doc) {
    if (err) return handleError(err);
    return res.send(doc);
  });
};

exports.addStock = (req, res) => {
  VirtualPortfolio.findOneAndUpdate(
    { _id: req.body.portfolioId },
    { $addToSet: { stocks: { $each: req.body.stocks } } },
    { returnDocument: "after" },
    function (err, doc) {
      if (err) return console.log(err);
      return res.send(doc);
    }
  );
};

exports.getPortfolioForUser = (req, res) => {
  VirtualPortfolio.find({ user: res.locals.auth.uid }, function (err, doc) {
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
