const { Bugmodel } = require("../model/bug.model");

const express = require("express");
const bugRouter = express.Router();

bugRouter.post("/", async (req, res) => {
  let data = req.body;
  try {
    let bug = new Bugmodel(data);
    await bug.save();
    res.send({ msg: "Data added Successflly" });
  } catch (err) {
    res.send({ msg: "Something went wrong while posting" });
  }
});

bugRouter.patch("/:id", async (req, res) => {
  let id = req.params.id;
  let updatedBug = req.body;

  try {
    await Bugmodel.findByIdAndUpdate({ _id: id }, updatedBug);
    res.send({ msg: "Data Updated" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong while updating" });
  }
});

bugRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await Bugmodel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Data deleted" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong while deleting" });
  }
});

module.exports = { bugRouter };
