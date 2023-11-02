const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
});

connection.connect((err, result) => {
  if (err) {
    throw err;
  }
  console.log(`Connected database : ${process.env.DATABASE_NAME}`);
});

module.exports = connection;
