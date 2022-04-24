const worker = require("./worker/worker");

function callWorker() {
  console.log("Worker called!");
  worker();
}

setInterval(callWorker, 3000);
