import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient, gql } from 'graphql-request';
import { IGetAllProductResponse } from '../../interfaces/responses/getAllProducts';

const client = new GraphQLClient('http://localhost:5000/graphql', {
  headers: {},
});
export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        document: gql`
          query {
            getAllProducts {
              id
              images {
                src
              }
              bodyHTML
            }
          }
        `,
      }),
      transformResponse: (response: IGetAllProductResponse) =>
        response.getAllProducts,
    }),
  }),
});

export const { useGetAllProductsQuery } = api;
