const express=require("express")
const router=express.Router();
const connectDB=require("../config/db")
connectDB()
const Book=require("../models/BookSchema")










module.exports=router