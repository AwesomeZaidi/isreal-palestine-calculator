require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
const session = require("express-session");
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(routes);

app.get("/", (req, res) => {
  res.send(`Guess who's back, back again.`);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = app;
