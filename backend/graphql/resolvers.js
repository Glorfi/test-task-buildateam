/**
 * GraphQL Resolvers
 **/
import { Products } from '../db/mongoConnector.js';

export const resolvers = {
  Query: {
    getAllProducts: () => {
      return Products.find().exec();
    },
  },
  Mutation: {
    addProducts: (_, { products }) => {
      const newProducts = products.map((product) => new Products(product));
      return Products.insertMany(newProducts).then(() => newProducts);
    },
  },
};
