export const addProductsMutation = `
  mutation AddProducts($products: [ProductInput]) {
    addProducts(products: $products) {
      bodyHTML
      id
      images {
        src
      }
    }
  }
`;
