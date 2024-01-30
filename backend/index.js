import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/typeDefs.js';
import { fetchInitialProducts } from './utils/fetchProducts.js';
import { checkInitialRecords } from './utils/checkInitialRecords.js';
import { updateDB } from './utils/updateDb.js';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server
  .start()
  .then(() => {
    return checkInitialRecords(server);
  })
  .then((res) => {
    if (res.data.getAllProducts.length > 0) {
      return Promise.resolve();
    }
    return fetchInitialProducts().then((res) => {
      const products = res.data.products.nodes;
      return updateDB(server, products);
    });
  })
  .then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: 5000 }, () => {
      console.log(
        `Server is running at http://localhost:5000${server.graphqlPath}`
      );
    });
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });
