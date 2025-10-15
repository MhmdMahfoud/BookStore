const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use("/users", require("./routes/users"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`This is running in port ${PORT}`);
});
