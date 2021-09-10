const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Complaint = require("../models/AdminComplains");
const constants = require("../../constant");

router.get("/", (req, res, next) => {
  Complaint.find()
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
  const complaint = new Complaint({
    _id: new mongoose.Types.ObjectId(),
   
    br_number: req.body.br_number,
    type:req.body.type,
    complian_Category: req.body.complian_Category,
    description: req.body.description,
    status: "placed",
    placed_date: req.body.placed_date,
  });
  complaint
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /complaint",
        createcomplaint: complaint,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/br/:br", (req, res, next) => {
  const br = req.params.br;
  Complaint.find({ br_number: br })
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
router.patch("/viewed/:Id", (req, res, next) => {
  const id = req.params.Id;
  Complaint.findByIdAndUpdate(
    { _id: id },
    {
      status: "viewed",
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
// router.delete("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   Product.remove({ _id: id })
//     .exec()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });
// router.get("/:category", (req, res, next) => {
//   const category = req.params.category;
//   Product.find({ product_category: category })
//     .exec()
//     .then((docs) => {
//       console.log(docs);
//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.get("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   Product.findById(id)
//     .exec()
//     .then((doc) => {
//       console.log(doc);

//       if (doc) {
//         res.status(200).json(doc);
//       } else {
//         res.status(404).json({ message: "No valide entry found" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });
// router.patch("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   Product.findByIdAndUpdate(
//     { _id: id },
//     {
//       product_name: req.body.product_name,
//       product_category: req.body.product_category,
//       picture: req.body.picture,
//       unitprice: req.body.unitprice,
//       quantity: req.body.quantity,
//       description: req.body.description,
//     }
//   )
//     .exec()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });
module.exports = router;
