
/**
 * GraphQL Resolvers
 **/
import { Products } from "../db/mongoConnector.js";

export const resolvers = {
  Query: {
    getAllProducts: (root) => {
      return new Promise((resolve, reject) => {
        Products.find((err, products) => {
          if (err) reject(err);
          else resolve(products);
        });
      });
    },
  },
};
