const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Startup_User");
const constants = require("../../constant");

router.get("/", (req, res, next) => {
  User.find()
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
router.get("/:email", (req, res, next) => {
  const email = req.params.email;
  User.find({ email: email })
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
router.get("/byId/:id", (req, res, next) => {
  const id = req.params.id;
  User.findOne({ _id: id })
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
router.get("/br/:br", (req, res, next) => {
  const br = req.params.br;
  User.find({ br_number: br })
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
router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              br_number: req.body.br_number,
              name: req.body.name,
              email: req.body.email,
              password: hash,
              mobile: "",
              Address: "",
              NIC: "",
              accountType: req.body.accountType,
              img: "https://res.cloudinary.com/hiruna/image/upload/v1625729331/startupHub/PngItem_4212266_rd09ab.png",
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth faild",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth faild",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              br_number: user[0].br_number,
              username: user[0].name,
            },
            constants.jwtkey,
            {
              expiresIn: "1d",
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            token: token,
            br_number: user[0].br_number,
            name: user[0].name,
            usertype: user[0].accountType,
          });
        }
        res.status(401).json({
          message: "Auth faild",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/reset/:userID", (req, res, next) => {
  const id = req.params.userID;
  User.find({ email: id })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Reset faild a",
        });
      }
      bcrypt.compare(req.body.curpass, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Reset faild",
          });
        }
        if (result) {
          bcrypt.hash(req.body.newpass, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                message: "Reset faild b",
              });
            } else {
              User.findOneAndUpdate(
                { email: id },
                {
                  password: hash,
                }
              )
                .exec()
                .then((result) => {
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({ error: err });
                });

              return res.status(200).json({
                message: "Reset successful",
              });
            }
          });
        } else {
          return res.status(401).json({
            message: "Reset faild",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/forgot/:userID", (req, res, next) => {
  const id = req.params.userID;
  User.find({ email: id })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Reset faild a",
        });
      }

      bcrypt.hash(req.body.newpass, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "Reset faild b",
          });
        } else {
          User.findOneAndUpdate(
            { email: id },
            {
              password: hash,
            }
          )
            .exec()
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ error: err });
            });

          return res.status(200).json({
            message: "Reset successful",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/:userID", (req, res, next) => {
  const id = req.params.userID;
  User.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.user_name,
      email: req.body.email,
      img: req.body.picture,
      Address: req.body.address,
      NIC: req.body.NIC,
      mobile: req.body.mobile,
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
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  User.remove({ _id: id })
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
