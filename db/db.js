const mysql = require("mysql");
const dbData = require("./db.config");

const connection = mysql.createConnection({
  host: dbData.host,
  user: dbData.user,
  password: dbData.password,
  database: dbData.database,
});

connection.connect((err, result) => {
  if (err) console.log(err);
  console.log("Database-Connection was successful!");
});

module.exports = connection;
