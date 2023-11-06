"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");
const sshpk = require("sshpk");
const axios = require("axios");
const qs = require("query-string");
const httpSignature = require("http-signature");
const bodyParser = require("body-parser");
const app = module.exports = express();
const port = process.env.PORT || 2321;

app.use(express.static(path.join(__dirname, "/View")));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
    res.end();
  });

  app.get("/", function (req, res) {
    res.sendFile("/src/index.html");
  });

  app.post("/oauth/callback", (req, res) => {
    console.log(req);
    // const queryString = new URLSearchParams(req.body).toString();
    const getBody = req.bodyParser.urlencoded();
    console.log(getBody);
    res.redirect(`coolish://callback?${req.body}`);
  });

  app.listen(port, () => {
    console.log(`Open at port http://localhost:${port}`);
  });