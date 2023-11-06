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
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
    res.end();
  });

  app.get("/", function (req, res) {
    res.sendFile("/src/index.html");
  });

  app.post("/oauth/callback", (req, res) => {
    // console.log(req.body);
    const queryString = qs.stringify(req.body);
    // const queryString = new URLSearchParams(req.body).toString();
    // const getBody = req.bodyParser.urlencoded();
    // console.log(getBody);
    console.log(req.body.state);
    const param = req.body;
    res.redirect(`https://playgalaxy.net/oauth/callback?${queryString}`);
  });

  app.listen(port, () => {
    console.log(`Open at port http://localhost:${port}`);
  });