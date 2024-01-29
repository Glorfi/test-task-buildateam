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
// index.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/typeDefs.js';
import { fetchInitialProducts } from './utils/fetchProducts.js';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server
  .start()
  .then(() => {
    return server.executeOperation({
      query: `
        query {
          getAllProducts {
            bodyHTML
            images {
              src
            }
            id
          }
        }
      `,
    });
  })
  .then((res) => {
    if (res.data.getAllProducts.length > 0) {
      console.log('Number of products:', res.data.getAllProducts.length);
      return;
    } else {
      console.log("You've got to fetch some data here");
      return fetchInitialProducts().then((res) => {
        const products = res.data.products.nodes;
      //console.log(typeof products[0].bodyHtml);
        return server.executeOperation({
          query: `
            mutation AddProducts($products: [ProductInput]) {
              addProducts(products: $products) {
                bodyHTML
                id
                images {
                  src
                }
              }
            }
          `,
          variables: {
            products: products.map((product) => ({
              bodyHTML: product.bodyHtml,
              id: product.id,
              images: product.images.nodes.map((image) => ({
                src: image.src,
              })),
            })),
          },
        });
      });
      //  .then((res) => console.log(res));
    }
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
