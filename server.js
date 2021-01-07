if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const path = require("path");
const mongoose = require("mongoose");
const config = require("./config/database");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();
app.use(cors());

//user passport config
require("./passport-config")(passport);

//connecting to database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error :"));
db.once("open", () => {
  console.log("Connected to Mongodb");
});

//setup view engine
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/subparts"),
]);

//parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//express session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// // passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//static files
app.use(express.static("./Public"));

//routes
var userpages = require("./controllers/userpages");
var adminpages = require("./controllers/adminpage");
var controller = require("./controllers/controller");
var computer_parts_controller = require("./controllers/computer_parts_controller");

//database schema
const userAccountsSchema = require("./models/userAccountsSchema");
const adminAccountsSchema = require("./models/adminAccountsSchema");

app.use("/admin", adminpages);
app.use("/user", userpages);
app.use("/", controller);
app.use("/orderpage/computer_parts", computer_parts_controller);

//listening to the port
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(`Unable to listen to port 3000 ${err}`);
  } else {
    console.log("Listening to port 3000");
  }
});
