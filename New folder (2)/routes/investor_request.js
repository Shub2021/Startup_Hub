const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const IRequest = require("../models/Investor_Request");
const constants = require("../../constant");

router.get("/", (req, res, next) => {
  IRequest.find()
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
router.get("/sent/:startupId/:investorEmail", (req, res, next) => {
  const startupId = req.params.startupId;
  const investorEmail = req.params.investorEmail;
  IRequest.find({ startupId: startupId, investorEmail: investorEmail })
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
router.get("/recieved/:investorEmail", (req, res, next) => {
  const investorEmail = req.params.to;
  IRequest.find({ investorEmail: investorEmail })
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
  const startupId = req.body.startupId;
  const investorEmail = req.body.investorEmail;
  IRequest.find({ startupId: startupId, investorEmail: investorEmail })
    .exec()
    .then((result) => {
      if (result.length >= 1) {
        return res.status(409).json({
          message: "Request exists",
        });
      } else {
        const request = new SRequest({
          _id: new mongoose.Types.ObjectId(),
          startupId: req.body.startupId,
          investorEmail: req.body.investorEmail,
        });
        request
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Handling POST request to /srequest",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      }
    });
});
router.delete("/:startupId/:investorEmail", (req, res, next) => {
  const startupId = req.params.startupId;
  const investorEmail = req.params.investorEmail;
  IRequest.deleteMany({ startupId: startupId, investorEmail: investorEmail })
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
