const express = require("express");
const Type = require("../models/type");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/types", auth, async (req, res) => {
  const type = new Type({ ...req.body, owner: req.user._id });

  try {
    await type.save();
    res.status(201).send(type);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/types", auth, async (req, res) => {
  try {
    await req.user.populate("types");
    res.send(req.user.types);
  } catch (e) {
    res.status(500).send();
    console.log(e);
  }
});

router.delete("/types/:id", auth, async (req, res) => {
  try {
    const type = await Type.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!type) {
      res.status(404).send();
    }
    res.send(type);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
