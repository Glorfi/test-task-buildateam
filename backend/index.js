// import { ApolloServer } from 'apollo-server';
// import mongoose from 'mongoose';
// import express from 'express';
// import { graphqlHTTP } from 'express-graphql';
// import cors from 'cors';
// import schema from './schema.js';
// import { fetchInitialProducts } from './utils/fetchProducts.js';
// import { formatInitialResponse } from './utils/formatInitialResponce.js';
// import typeDefs from './grapghql/typeDefs.js';
// import resolvers from './grapghql/resolvers.js';

// const MONGODB =
//   'mongodb+srv://admin:admin@cluster0.t1gaslr.mongodb.net/?retryWrites=true&w=majority';
// const server = new ApolloServer({ typeDefs, resolvers });

// const app = express();

// const products = [];
// fetchInitialProducts().then((res) => {
//   products.push(...formatInitialResponse(res));
// });

// app.use(cors());

// const root = {
//   getAllProducts: () => {
//     return products;
//   },
// };

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     graphiql: true,
//     schema,
//     rootValue: root,
//   })
// );

// app.listen(5000, () => {
//   console.log('server started on port 5000');
// });
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/typeDefs.js';

/**
 * Create an Apollo server instance.
 */
const server = new ApolloServer({ typeDefs, resolvers });

/**
 * Create an express server and apply the Apollo Server middleware
 */
const app = express();
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 5000 }, () => {
    console.log(
      `Server is running at http://localhost:5000${server.graphqlPath}`
    );
  });
});

app.get('/', (req, res) => {
  console.log('Apollo GraphQL Express server is ready');
});
