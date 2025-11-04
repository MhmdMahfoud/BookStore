const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allows cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));
app.use("/Category", require("./routes/Category"));
app.use("./public/images" , express.static("images"));
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This is running in port ${PORT}`);
});
