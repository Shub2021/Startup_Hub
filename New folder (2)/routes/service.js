const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Service = require("../models/Service");
const constants = require("../../constant");

router.get("/", (req, res, next) => {
  Service.find()
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

router.get("/:service_id", (req, res, next) => {
  const id = req.params.service_id
  Service.find({_id:id})
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
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
    service_name: req.body.Service_name,
    picture: req.body.picture,
    service_type: req.body.Service_type,
    Description: req.body.Description,
    br_number: req.body.br_number,
    package:arr,
  });
  service
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /service",
        createService: service,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId;
  Service.remove({ _id: id })
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

router.patch("/:serviceID", (req, res, next) => {
  const id = req.params.serviceID;
  Service.findByIdAndUpdate(
    { _id: id },
    {
    service_name: req.body.Service_name,
    picture: req.body.picture,
    service_type: req.body.Service_type,
    Description: req.body.Description,
    package: req.body.package_type,
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

router.patch("/package/:serviceID", (req, res, next) => {
  const id = req.params.serviceID;
  Service.findByIdAndUpdate(
    { _id: id },
    {
    package: req.body.package,
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

module.exports = router;
