const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  description: String,
  keyPoints: [
    {
      type: String,
    },
  ],
});

const StrategyDataModel = mongoose.model("StrategyData", schema);
module.exports = StrategyDataModel;
