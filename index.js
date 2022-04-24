const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("./db/db");
const fs = require("fs");
const CryptoJS = require("crypto-js");

const Port = 3403;
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    routes: [
      "/urlstats/url_id",
      "/urllist/user_id",
      "/screenshots/photoname",
      "/addurl/user_id/url",
    ],
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
function getStats(urlId, res) {
  sql.query(
    `SELECT * FROM stats_table WHERE url_id = '${urlId}'`,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result.length === 0) {
          res.send({ urlname: "", scans: "" });
        } else {
          sql.query(
            `SELECT url FROM url_table WHERE url_id = '${urlId}'`,
            function (err, url) {
              if (err) {
                console.log(err);
              } else {
                res.send({ urlname: url[0].url, scans: result });
              }
            }
          );
        }
      }
    }
  );
}
//End of Get URL Stats

//Start of Get Screenshots
app.get("/screenshots/:filename", (req, res) => {
  var filename = req.params.filename;
  getImages(filename, res);
});
function getImages(filename, res) {
  fs.readFile(
    `../data-processing/screenshots/${filename}`,
    function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "img/png" });
        res.write(data);
        res.end();
      }
    }
  );
}
//End of Get Screenshots

//Start of Get URL List
app.get("/urllist/:userId", (req, res) => {
  var userId = req.params.userId;
  getUrls(userId, res);
});
function getUrls(userId, res) {
  sql.query(
    `SELECT * FROM url_table WHERE user_id = '${userId}'`,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ urllist: result });
      }
    }
  );
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
  sql.query(
    `INSERT INTO url_table values('${userId}','${url}','${urlId}')`,
    function (erro, resu) {
      if (erro) {
        res.send({ status: erro });
      } else {
        res.send({ status: "success" });
      }
    }
  );
}
//End of Add URL

//Start of User Login
app.get("/login/:googleId/:email/:name", (req, res) => {
  var googleId = req.params.googleId;
  var email = req.params.email;
  var name = req.params.name;
  login(googleId, email, name, res);
});
function login(googleId, email, name, res) {
  console.log(googleId);
  sql.query(
    `SELECT * FROM login_table WHERE user_id = '${googleId}'`,
    function (err, result) {
      if (err) {
        res.send({ status: err });
      } else {
        if (result.length === 0) {
          sql.query(
            `INSERT INTO login_table values('${googleId}','${name}','${email}');`,
            function (err, result) {
              if (err) {
                res.send({ status: err });
              } else {
                res.send({
                  message: "success",
                  status: "new",
                  user_id: googleId,
                });
              }
            }
          );
        } else {
          res.send({
            message: "success",
            status: "existing",
            user_id: googleId,
          });
        }
      }
    }
  );
}
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

//Start of AES Encryption
function encryptWithAES(text) {
  const passphrase = "9737426927";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
}
//End of AES Encryption

//Start of AES Decryption
function decryptWithAES(ciphertext) {
  const passphrase = "9737426927";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
//End of AES Decryption

app.listen(Port, console.log("Script Started"));
