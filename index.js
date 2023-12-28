const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
require("dotenv").config();

const db = require("./config/db");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/UsersRouter");
const productRouter = require("./routes/ProductRouter");
const orderRouter = require("./routes/OrderRouter");

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: ['http://localhost:3001'], // Allow requests from these origins
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/public", express.static("public"));
app.use("/public/productImages", express.static("public"));


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

db.query('SELECT 1 + 1', (error, results, fields) => {
  if (error) throw error;
  console.log('Connected to MySQL!');
});

// Example route to check MySQL connection status
app.get("/check-connection", (req, res) => {
  if (db.state === "authenticated") {
    res.json({ message: "MySQL connection is established" });
  } else {
    res.json({ message: "MySQL connection is not established" });
  }
});