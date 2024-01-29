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
  type Mutation {
    addProducts(products: [ProductInput]): [Product]
  }

  input ProductInput {
    id: String!
    bodyHTML: String!
    images: [ImageInput]!
  }

  input ImageInput {
    src: String!
  }
`;
