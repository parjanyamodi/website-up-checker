const puppeteer = require("puppeteer");
const sql = require("../db/db");
const nodemailer = require("nodemailer");

const iPad = puppeteer.devices["iPad Pro landscape"];

async function worker() {
  sql.query("SELECT * FROM url_table;", async function (err, res) {
    if (err) {
      return null;
    } else {
      for (let i in res) {
        var obj = res[i];
        const browser = await puppeteer.launch({
          executablePath: "/usr/bin/chromium-browser",
          args: [
            "--disable-gpu",
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--no-zygote",
          ],
        });
        const time = new Date();
        try {
          const page = await browser.newPage();
          await page.emulate(iPad);
          await page.setDefaultTimeout(20000);
          await page.goto(`https://${obj.url}`);

          const metrics = await page.metrics();

          //console.log(metrics.TaskDuration);
          await page.screenshot({
            path: `./screenshots/${obj.url_id}_${metrics.Timestamp}.png`,
          });
          const screenshotname = `${obj.url_id}_${metrics.Timestamp}.png`;

          sql.query(
            `INSERT INTO stats_table (user_id, url_id, time_stamp, status_code, layout_duration, recalcstyle_duration, script_duration, task_duration, screenshot) values('${obj.user_id}','${obj.url_id}','${time}','200','${metrics.LayoutDuration}','${metrics.RecalcStyleDuration}','${metrics.ScriptDuration}','${metrics.TaskDuration}','${screenshotname}')`,
            function (err, res) {
              if (err) {
                console.log(err);
              } else {
                return null;
              }
            }
          );
        } catch (error) {
          const screenshotname = "error";
          sql.query(
            `INSERT INTO stats_table (user_id, url_id, time_stamp, status_code, layout_duration, recalcstyle_duration, script_duration, task_duration, screenshot) values('${obj.user_id}','${obj.url_id}','${time}','${error}','','','','','${screenshotname}')`,
            function (err, res) {
              if (err) {
                console.log(err);
              } else {
                sendMail(obj.user_id, error);
              }
            }
          );
        } finally {
          await browser.close();
        }
      }
    }
  });
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
