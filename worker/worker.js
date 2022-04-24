const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");

const iPad = puppeteer.devices["iPad Pro landscape"];

async function worker() {
  var res = ["parjanyamodi.com"];
  for (let i in res) {
    var obj = res[i];
    const browser = await puppeteer.launch();
    const time = new Date();
    try {
      const page = await browser.newPage();
      await page.emulate(iPad);
      await page.setDefaultTimeout(20000);
      await page.goto(`https://${obj}`);

      const metrics = await page.metrics();

      console.log(metrics);
    } catch (error) {
      console.log(error);
    } finally {
      await browser.close();
    }
  }
}

function sendMail(user_id, error) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "parjanyamodi@gmail.com",
      pass: "WinMac@2020gmail",
    },
  });
  sql.query(
    `SELECT email FROM login_table WHERE user_id = '${user_id}'`,
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: "parjanyamodi@gmail.com",
          to: `${res[0].email}`,
          subject: "Error in Website",
          text: `${error}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            return null;
          }
        });
      }
    }
  );
}

module.exports = worker;
