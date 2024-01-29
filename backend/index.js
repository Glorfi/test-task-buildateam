// Your main file

import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './schema.js';
import { fetchInitialProducts } from './utils/fetchProducts.js';
import { formatInitialResponse } from './utils/formatInitialResponce.js';

const app = express();

const products = [];
fetchInitialProducts().then((res) => {
  products.push(...formatInitialResponse(res));
});

app.use(cors());

const root = {
  getAllProducts: () => {
    return products;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(5000, () => {
  console.log('server started on port 5000');
});
