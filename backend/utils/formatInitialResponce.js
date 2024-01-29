export function formatInitialResponse(data) {
  const productNodes = data.data.products.nodes;
  const transformedProducts = productNodes.map((productNode) => {
    return {
      id: productNode.id,
      images: productNode.images.nodes.map((imageNode) => {
        return {
          src: imageNode.src,
        };
      }),
      bodyHTML: productNode.bodyHtml,
    };
  });
  return transformedProducts;
}
