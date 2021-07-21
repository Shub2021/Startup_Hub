const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Jobs = require("../models/Jobs");
const constants = require("../../constant");


router.get("/", (req, res, next) => {
  Jobs.find()
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
router.post("/", (req, res, next) => {
  const arr = [];
  const jobs = new Jobs({
    _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
    description:req.body.description,
    serviceid: req.body.serviceid,
    clientid: req.body.clientid,
    taskarray: arr,
  });
  jobs
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /Jobs",
        createJobs: jobs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
/*
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/:category", (req, res, next) => {
  const category = req.params.category;
  Product.find({ product_category: category })
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
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
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
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndUpdate(
    { _id: id },
    {
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      picture: req.body.picture,
      unitprice: req.body.unitprice,
      quantity: req.body.quantity,
      description: req.body.description,
    }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
*/
module.exports = router;