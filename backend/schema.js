import { buildSchema } from 'graphql';

const schema = buildSchema(
  `
  type Image {
    src: String
  }
  
  type Product {
    id: ID
    bodyHTML: String
    images: [Image]
  }

  type Query {
    getAllProducts: [Product]
  }
  `
);

export default schema;
