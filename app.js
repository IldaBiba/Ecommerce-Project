const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./util/database");
const app = express();
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
// const csrf = require("csurf");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(csrf());

// Apply CORS headers globally
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
// app.use(express.static(path.join(__dirname, "images")));
app.use("/images", express.static("images"));

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
