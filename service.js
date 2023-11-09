"use strict";

require("dotenv").config();
const express = require("express");
const path = require("path");
const sshpk = require("sshpk");
const axios = require("axios");
const qs = require("query-string");
const httpSignature = require("http-signature");
const bodyParser = require("body-parser");
const app = (module.exports = express());
const port = process.env.PORT || 2321;
const jwt = require("jsonwebtoken");

app.use(express.static(path.join(__dirname, "/View")));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  res.end();
});

app.get("/", function (req, res) {
  res.sendFile("/src/index.html");
});

//post url
app.post("/oauth/callback", (req, res) => {
  const queryString = qs.stringify(req.body);
  const token = req.body.id_token;
  const code = req.body.code;
  const result = jwt.decode(token);
  console.log(req.body);

  const url = `coolish://callback?${queryString}&code=${code}`;

  console.log(url);
  res.redirect(url);
});

app.listen(port, () => {
  console.log(`Open at port http://localhost:${port}`);
});
