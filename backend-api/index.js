const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("./db/db");
const fs = require("fs");
const CryptoJS = require("crypto-js");

const Port = 4500;
const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    routes: ["/urlstats/url_id", "/urllist/user_id", "/screenshots/photoname"],
  });
});

app.use(
  cors({
    origin: "*",
  })
);

/*require("./routes/user.route")(app);
require("./routes/proctor.route")(app);
require("./routes/student.route")(app);*/
app.get("/urlstats/:keyname", (req, res) => {
  var keyName = req.params.keyname;
  getStats(keyName, res);
});

function getStats(keyName, res) {
  sql.query(
    `SELECT * FROM stats_table WHERE url_id = '${keyName}'`,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        sql.query(
          `SELECT url FROM url_table WHERE url_id = '${keyName}'`,
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
  );
}

app.get("/screenshots/:keyname", (req, res) => {
  var keyName = req.params.keyname;
  getImages(keyName, res);
});

function getImages(keyName, res) {
  fs.readFile(
    `../data-processing/screenshots/${keyName}.png`,
    function (err, data) {
      res.writeHead(200, { "Content-Type": "img/png" });
      res.write(data);
      res.end();
    }
  );
}

app.get("/urllist/:keyname", (req, res) => {
  var keyName = req.params.keyname;
  getUrls(keyName, res);
});

function getUrls(keyName, res) {
  sql.query(
    `SELECT * FROM url_table WHERE user_id = '${keyName}'`,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ urllist: result });
      }
    }
  );
}
app.get("/register/:email/:password", (req, res) => {
  var eMail = req.params.email;
  var passWord = encryptWithAES(req.params.password);
  register(eMail, passWord, res);
});

function register(eMail, passWord, res) {
  sql.query(
    `SELECT email from login_table WHERE email = '${eMail}'`,
    function (err, result) {
      if (err) {
        res.send({ status: err });
      } else {
        if (result.length === 0) {
          var user_id = makeId(30);
          sql.query(
            `INSERT INTO login_table values('${user_id}','${eMail}','${passWord}')`,
            function (erro, resu) {
              if (erro) {
                res.send({ status: erro });
              } else {
                res.send({ status: "success" });
              }
            }
          );
        } else {
          res.send({ status: "decline" });
        }
      }
    }
  );
}

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

app.get("/login/:email/:password", (req, res) => {
  var eMail = req.params.email;
  var passWord = req.params.password;
  login(eMail, passWord, res);
});

function login(eMail, passWord, res) {
  sql.query(
    `SELECT * FROM login_table WHERE email = '${eMail}'`,
    function (err, result) {
      if (err) {
        res.send({ status: err });
      } else {
        if (passWord == decryptWithAES(result[0].pass)) {
          res.send({ status: "success" });
        } else {
          res.send({ status: "decline" });
        }
      }
    }
  );
}

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
function encryptWithAES(text) {
  const passphrase = "123";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
}

function decryptWithAES(ciphertext) {
  const passphrase = "123";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
app.listen(Port, console.log("Listening to post 4500"));
