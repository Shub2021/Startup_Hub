const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PRequest = require("../models/Partner_Request");
const constants = require("../../constant");

router.get("/", (req, res, next) => {
  PRequest.find()
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
router.get("/sent/:from/:to", (req, res, next) => {
  const br = req.params.from;
  const to = req.params.to;
  PRequest.find({ from: br, to: to })
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
router.get("/recieved/:to", (req, res, next) => {
  const to = req.params.to;
  PRequest.find({ to: to })
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
  const from = req.body.from;
  const to = req.body.to;
  PRequest.find({ from: from, to: to })
    .exec()
    .then((result) => {
      if (result.length >= 1) {
        return res.status(409).json({
          message: "Request exists",
        });
      } else {
        const request = new PRequest({
          _id: new mongoose.Types.ObjectId(),
          from: req.body.from,
          to: req.body.to,
          status: req.body.status,
        });
        request
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Handling POST request to /prequest",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      }
    });
});
router.delete("/:from/:to", (req, res, next) => {
  const from = req.params.from;
  const to = req.params.to;
  PRequest.deleteMany({ from: from, to: to })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
