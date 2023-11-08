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
  const result = jwt.decode(token);
  console.log(result);
  // https 인증서 발급된 도메인 등록
  const url = `/coolish://callback?${queryString}`;

  console.log(url);

  res.redirect(`/oauth/callback?coolish://callback?https://appleid.apple.com/auth/authorize?${queryString}`);
  // return res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Open at port http://localhost:${port}`);
});

