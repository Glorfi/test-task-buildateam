import { addProductsMutation } from '../graphql/mutations.js';

export function updateDB(server, products) {
  return server.executeOperation({
    query: addProductsMutation,
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
}
