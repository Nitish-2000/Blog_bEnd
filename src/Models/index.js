import mongoose from "mongoose";
// const DB = require('../common/dbConfig')
// require('dotenv').config()
import dotenv from "dotenv";
dotenv.config();

try {
  mongoose.connect(`${process.env.dburl}/${process.env.dbname}`);
} catch (error) {
  console.log(error);
}

export default mongoose;
