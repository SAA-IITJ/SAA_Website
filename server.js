const express = require("express");
const path = require("path");
const db = require("./config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("./utils/logger");


require("dotenv").config({ path: ".env.sample" });

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// using path.join as node may be called from another directory
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(require("./routes/index"));

db.ORM.sync({ force: false }).then(() => {

  app.listen(PORT,() => {logger("Server is listening" ,"success")});
});
