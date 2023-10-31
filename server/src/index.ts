require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
// import routes from "./routes";
const session = require("express-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(routes);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send(`Guess who's back, back again.`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
