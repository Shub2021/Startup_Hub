const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const constants = require("../../constant");

router.get("/", (req, res, next) => {
  Product.find({ company_status: "active" })
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
router.get("/br/:br", (req, res, next) => {
  const br = req.params.br;
  Product.find({ br_number: br, company_status: "active" })
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
  const arr = [{ rate: 0, client: "none", comment: " " }];
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    product_name: req.body.product_name,
    product_category: req.body.product_category,
    company_category: req.body.company_category,
    picture: req.body.picture,
    expence: req.body.expence,
    unitprice: req.body.unitprice,
    quantity: req.body.quantity,
    description: req.body.description,
    br_number: req.body.br_number,
    avg_rate: 0,
    company_status: "active",
    rating: arr,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /products",
        createProduct: product,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
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
      expence: req.body.expence,
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
router.patch("/ban/:br_number", (req, res, next) => {
  const id = req.params.br_number;
  Product.findByIdAndUpdate(
    { br_number: id },
    {
      company_status: req.body.company_status,
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
