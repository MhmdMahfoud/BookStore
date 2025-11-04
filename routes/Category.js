const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");
connectDB();
const category = require("../models/CategorySchema");
router.post("/category", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json("name is required ");
  } else {
    const newCategory = new category({ name });
    await newCategory.save();
    res.status(201).json({ message: "added succssesfuly" });
  }
});

router.get("/getCategory", async (req, res) => {
  try {
    const newCategory = await category.find()
    return res.json(newCategory);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
