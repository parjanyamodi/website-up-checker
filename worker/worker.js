const request = require("request");
const puppeteer = require("puppeteer");
const sql = require("../db/db");

const iPad = puppeteer.devices["iPad Pro landscape"];

async function worker() {
  const url = sql.query(
    "SELECT url FROM url_table;",
    async function (err, res) {
      if (err) {
        return null;
      } else {
        for (let i in res) {
          var obj = res[i];
          console.log(obj);
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          const response = request(
            `${obj.url}`,
            function (error, response, body) {
              if (error) console.log(error);
              console.log("statusCode:", response.statusCode); // Print the response status code if a response was received
              return error.statusCode || response.statusCode;
            }
          );
          console.log(response);
          if (response === 200) {
            await page.emulate(iPad);
            await page.goto(`${obj.url}`);
            const metrics = await page.metrics();
            console.log(metrics);
            /*
          console.log(
            metrics.LayoutDuration +
              metrics.RecalcStyleDuration +
              metrics.ScriptDuration +
              metrics.TaskDuration
          );*/
            //const screenshot = await page.screenshot({ path: `${url}.png` });

            /*console.log(
            `${metrics.Timestamp}:{metrics: ${metrics},screenshot: ${screenshot}`
          );*/
            await browser.close();
          } else {
            console.log(response);
            await browser.close();
          }
        }
      }
    }
  );
  console.log(url);
}

module.exports = worker;
