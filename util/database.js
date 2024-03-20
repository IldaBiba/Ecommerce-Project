const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "ecommerce-react",
  password: "#root.ilda2003#",
});

module.exports = pool;
