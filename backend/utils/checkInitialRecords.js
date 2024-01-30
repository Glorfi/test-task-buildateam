import { getAllProductsIdsQuery } from '../graphql/queries.js';

export function checkInitialRecords(server) {
  return server.executeOperation({
    query: getAllProductsIdsQuery,
  });
}
