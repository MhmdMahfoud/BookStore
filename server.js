const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv").config();
app.listen(3000, () => {
  console.log("this is listen in port 3000");
});
