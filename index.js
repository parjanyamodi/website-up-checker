const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const client = require("./db/db");

const Port = 3405;
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  /*res.send({
    routes: ["/urlstats/url_id", "/urllist/user_id", "/addurl/user_id/url"],
  });*/
  client.connect((err) => {
    const collection = client
      .db("upchecker")
      .collection("url-list")
      .insertOne({ quote: "This is my quote." });
    res.send(collection);
    console.log(collection);
    client.close();
  });
});

app.use(
  cors({
    origin: "*",
  })
);

/*
-------------------------------------------------------------------API Requests Functions------------------------------------------------------------------
*/

//Start of Get URL Stats
app.get("/urlstats/:urlId", (req, res) => {
  var urlId = req.params.urlId;
  getStats(urlId, res);
});
function getStats(urlId, res) {}
//End of Get URL Stats

//Start of Get URL List
app.get("/urllist/:userId", (req, res) => {
  var userId = req.params.userId;
  getUrls(userId, res);
});
function getUrls(userId, res) {
  client.connect((err) => {
    const collection = client.db("upchecker").collection("url-list");
    res.send(`${collection}`);
    console.log(collection);
    client.close();
  });
}
//End of Get URL List

//Start of Add URL
app.get("/addurl/:userId/:url", (req, res) => {
  var userId = req.params.userId;
  var url = req.params.url;
  addUrl(userId, url, res);
});
function addUrl(userId, url, res) {
  var urlId = makeId(50);
}
//End of Add URL

//Start of User Login
app.get("/login/:googleId/:email/:name", (req, res) => {
  var googleId = req.params.googleId;
  var email = req.params.email;
  var name = req.params.name;
  login(googleId, email, name, res);
});
function login(googleId, email, name, res) {}
//End of User Login

/*
-------------------------------------------------------------------Supporting Functions-------------------------------------------------------------------
*/

//Start of Random Character
function makeId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
//End of Random Character

app.listen(Port, console.log("Script Started"));
