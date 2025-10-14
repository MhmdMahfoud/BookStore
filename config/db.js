const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose
    .connect(process.env.Mongo_URI)
    .then(() => {
      console.log("coonnection Succssfull ");
    })
    .catch((error) => {
      console.log("there is an error", error);
    });
};

module.exports=connectDB