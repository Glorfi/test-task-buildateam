import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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
`;
