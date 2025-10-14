const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB=require("./config/db")
connectDB();

const app = express();
const cors = require("cors");
app.use(cors());

const PORT = process.env.port;
app.listen(PORT, () => {
  console.log(`This is running in port ${PORT}`);
});
