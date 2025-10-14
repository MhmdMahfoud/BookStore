const mongoose= require("mongoose")
const { unique } = require("next/dist/build/utils")
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    }
})
module.exports = mongoose.model("User",UserSchema)