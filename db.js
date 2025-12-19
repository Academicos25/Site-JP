const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql#1234",
  database: "site_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL conectado");
});

module.exports = db;
