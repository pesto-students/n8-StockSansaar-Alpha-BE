const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  user: String,
  stocks: [
    {
      name: String,
      symbol: String,
      price: String,
      quantity: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

const VirtualPortfolioModel = mongoose.model("VirtualPortfolio", schema);
module.exports = VirtualPortfolioModel;
