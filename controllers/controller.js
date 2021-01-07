// require('dotenv').config()

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// const { ensureAuth } = require('../config/ensureAuth')
// const { notEnsured } = require('../config/ensureAuth')
const Account = require("./../models/userAccountsSchema");
const Admin = require("./../models/adminAccountsSchema");
const jwt = require("jsonwebtoken");
// const passport = require('passport')

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/orderpage", (req, res) => {
  res.render("orderpage");
});
router.get("/orderpage/computer_parts", (req, res) => {
  res.render("computer_parts");
});
router.get("/orderpage/ready_to_wear", (req, res) => {
  res.render("rtw");
});
router.get("/orderpage/hand_tools", (req, res) => {
  res.render("ht");
});
router.get("/orderpage/gadgets", (req, res) => {
  res.render("gadgets");
});
router.get("/orderpage/appliances", (req, res) => {
  res.render("appliances");
});
router.get("/orderpage/others", (req, res) => {
  res.render("others");
});

router.post("/signup", async (req, res) => {
  var isPassword6 = Object.keys(req.body.password).length;

  if (req.body.password !== req.body.conpassword)
    return (
      req.flash("error_msg", "Password did not match"), res.redirect("/signup")
    );
  if (isPassword6 <= 5)
    return (
      req.flash("error_msg", "Password must be atleast 6 characters"),
      res.redirect("/signup")
    );

  const username = req.body.username;

  if (username.includes(".admin")) {
    await Admin.find({ username: username }, async (err, docs) => {
      if (docs.length) {
        req.flash("error_msg", "Username already used");
        res.redirect("/signup");
      } else {
        await Admin.find({ email: req.body.email }, async (err, docs) => {
          if (docs.length) {
            req.flash("error_msg", "Email already used!");
            res.redirect("/signup");
          } else {
            try {
              const hashedpassword = await bcrypt.hash(
                req.body.conpassword,
                10
              );
              let admin = await new Admin({
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedpassword,
                contactno: req.body.contactno,
                email: req.body.email,
              });
              admin = admin.save();
              console.log("Admin Saved!");
              req.flash("success_msg", "Admin Registered!");
              res.redirect("/user/login");
            } catch (err) {
              console.log(err);
              res.redirect("/signup");
            }
          }
        });
      }
    });
    //----- if the user registered  //------------------------------------------------------------------------------------------------------
  } else {
    await Account.find({ username: username }, async (err, docs) => {
      if (docs.length) {
        req.flash("error_msg", "Username already exists");
        res.redirect("/signup");
      } else {
        await Account.find({ email: req.body.email }, async (err, docs) => {
          if (docs.length) {
            req.flash("error_msg", "Email already used!");
            res.redirect("/signup");
          } else {
            try {
              const hashedpassword = await bcrypt.hash(
                req.body.conpassword,
                10
              );
              let account = await new Account({
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedpassword,
                contactno: req.body.contactno,
                email: req.body.email,
              });
              account = account.save();
              console.log("Account Saved!");
              req.flash("success_msg", "Account Registered!");
              res.redirect("/user/login");
            } catch (err) {
              console.log(err);
              res.redirect("/signup");
            }
          }
        });
      }
    });
  }
});

module.exports = router;
