const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: String,
});

const Bugmodel = mongoose.model("bug", bugSchema);

module.exports = { Bugmodel };
