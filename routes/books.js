const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");
connectDB();
const multer = require("multer");
const Book = require("../models/BookSchema");

// ===== Multer setup =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ===== Create book =====
router.post("/createBook", upload.single("coverImage"), async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      price,
      stouk,
      isFeatured,
      isOnSale,
      Category,
      discountPercentege,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !author ||
      !description ||
      !price ||
      !stouk ||
      !isFeatured ||
      !isOnSale ||
      !Category ||
      !discountPercentege
    ) {
      return res.status(400).json("All fields are required");
    }

    // Create a new book
    const newBook = new Book({
      title,
      author,
      description,
      price,
      stouk,
      isOnSale,
      isFeatured,
      discountPercentege,
      coverImage: req.file?.filename,
      Category,
    });

    await newBook.save()
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== Get all books =====
router.get("/getallbooks", async (req, res) => {
  try {
    const newbook = await Book.find().populate("Category", "name");
    return res.json(newbook);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// ===== Get single book by ID =====
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "Category",
      "name"
    );
    return res.status(200).json(book);
  } catch (error) {
    res.status(400).json(error);
  }
});

// ===== Update book =====
router.put("/updatebook/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("Category", "name");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== Delete book =====
router.delete("/deleteBook/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
