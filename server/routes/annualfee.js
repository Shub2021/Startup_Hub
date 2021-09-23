const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AnnualFee = require("../models/AnnualFee");
const constants = require("../../constant");

router.get("/", (req, res, next) => {
  AnnualFee.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/:br", (req, res, next) => {
  const br = req.params.br;
  AnnualFee.find({ br_number: br })
    .exec()
    .then((doc) => {
      console.log(doc);

      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valide entry found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/year/:year", (req, res, next) => {
  const year = req.params.year;
  AnnualFee.find({ year: year })
    .exec()
    .then((doc) => {
      console.log(doc);

      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valide entry found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/yearbr/:year/:br", (req, res, next) => {
  const year = req.params.year;
  const br = req.params.br;
  AnnualFee.find({ year: year, br_number: br })
    .exec()
    .then((doc) => {
      console.log(doc);

      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valide entry found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.post("/", (req, res, next) => {
  const fee = new AnnualFee({
    _id: new mongoose.Types.ObjectId(),
    br_number: req.body.br_number,
    paymentDate: req.body.paymentDate,
    amount: req.body.amount,
    year: req.body.year,
  });
  fee
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /AnnualFee",
        createJobs: fee,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
