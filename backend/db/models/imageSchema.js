import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema({
  src: String,
});