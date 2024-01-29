const shopifyApiUrl =
  'https://cpb-new-developer.myshopify.com/admin/api/2024-01/graphql.json';

const grapghqlQueryInternal = `{
  getAllProducts {
    bodyHTML
    images {
      src
    }
    id
  }
}`;

const graphqlQueryExternal = `
{
    products(first: 10) {
        nodes {
            id
            images(first: 10) {
                nodes {        
                    src
                }
            }
            bodyHtml
        }
    }
}
`;

export function fetchInitialProducts() {
  return fetch(shopifyApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': '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',
    },
    body: JSON.stringify({ query: graphqlQueryExternal }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('GraphQL Error:', error);
    });
}

export function getAllProducts() {
  return fetch('http://localhost:5000/graphql', {
    method: 'POST',
    body: JSON.stringify({ query: grapghqlQueryInternal }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('GraphQL request failed');
      }
      return response.json();
    })
    .then((data) => {
      console.log('GraphQL Data:', data);
      return data;
    })
    .catch((error) => {
      console.error('GraphQL Error:', error);
    });
}
