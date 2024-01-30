import mongoose from 'mongoose';
import { imageSchema } from './imageSchema.js';

export const productSchema = new mongoose.Schema({
  id: String,
  bodyHTML: String,
  images: [imageSchema],
});
