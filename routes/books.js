const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");
connectDB();
const Book = require("../models/BookSchema");
try {
  router.post("/books", async (req, res) => {
    const {
      title,
      author,
      description, //description
      price,
      stouk,
      isOnSale,
      isFeatured,
      discountPercentege,
      coverImage,
      Category,
    } = req.body;
    const newBook = new Book({
      title,
      author,
      description,
      price,
      stouk,
      isOnSale,
      isFeatured,
      discountPercentege,
      coverImage,
      Category,
    });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  });
} catch (error) {
  res.status(400).json(error);
}
try {
  router.get("/getallbooks", async (req, res) => {
    const newbook = await Book.find().populate("Category", "name");
    return res.json(newbook);
  });
} catch (error) {
  res.status(400).json({ error });
}

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "Category",
      "name"
    );
    return res.status(201).json(book);
  } catch (error) {
    res.status(400).json(error);
  }
});

// this for update the  book

router.put("/updatebook/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("Category", "name");
  if (!book) {
    res.status(404).json({ message: "Book ot found" });
  }
  res.json({ message: "book updated " });
});

module.exports = router;
