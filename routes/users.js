const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password and name are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash("password", 10);
    const newUser = new User({ email, password: hashedPass, name });
    await newUser.save();

    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });

    res.status(201).json({ message: "User added successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare("password", user.password))) {
      const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1w",
      });

      return res.status(200).json({
        message: "User signed in successfully",
        token,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id",async(req,res)=>{
  const user=await User.findById(req.params.id)
  if(!user){
    res.status(404).json({message:"There no user with this id "})
  }
  else{
    res.status(200).json({user})
  }
})

module.exports = router;
