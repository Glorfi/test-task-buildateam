import mongoose from 'mongoose';
import { imageSchema } from './models/imageSchema.js';
import { productSchema } from './models/productSchema.js';

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.t1gaslr.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', () => {
  console.error('Failed to connect to DB');
});

const Images = mongoose.model('Images', imageSchema);
const Products = mongoose.model('Products', productSchema);

export { Images, Products };
