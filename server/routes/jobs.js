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

router.get("/:brnumber", (req, res, next) => {
  const brnumber = req.params.brnumber;
<<<<<<< HEAD
  Jobs.find({ br_number: brnumber } )
=======
  Jobs.find({ br_number: brnumber })
>>>>>>> main
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
    description: req.body.description,
    serviceid: req.body.serviceid,
<<<<<<< HEAD
    clientid: req.body.clientid,
    br_number: req.body.br_number,
    job_status: req.body.job_status,
=======
    client_email: req.body.client_email,
    br_number: req.body.br_number,
    job_status: req.body.job_status,
    service_name: req.body.service_name,
    package_id: req.body.package_id,
    price: req.body.price,
    package_name: req.body.package_name,
>>>>>>> main
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
router.patch("/:jobId", (req, res, next) => {
  const id = req.params.jobId;
  Jobs.findByIdAndUpdate(
    { _id: id },
    {
      taskarray: req.body.taskarray,
<<<<<<< HEAD
      job_status: req.body.job_status, 
=======
      job_status: req.body.job_status,
>>>>>>> main
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
router.get("/byID/:jobID", (req, res, next) => {
  const id = req.params.jobID;
<<<<<<< HEAD
  Jobs.findById({ _id : id} )
=======
  Jobs.findById({ _id: id })
>>>>>>> main
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


*/
module.exports = router;
