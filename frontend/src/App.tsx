import { useGetAllProductsQuery } from './store/graphql-api/graphql.api';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Grid,
  HStack,
  Text,
} from '@chakra-ui/react';
import { ProductCard } from './components/ProductCard';

function App() {
  const { data, isError } = useGetAllProductsQuery('');

  return (
    <>
      <HStack bgColor={'cyan.800'} w={'100%'} p={'24px'}>
        <Text fontWeight={'500'} color={'white'} fontSize={'large'}>
          Test Task for Buildateam
        </Text>
      </HStack>
      {isError ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Connection error</AlertTitle>
          <AlertDescription>
            Have you started the local backend server?
          </AlertDescription>
        </Alert>
      ) : null}
      <Grid
        width={'100%'}
        minHeight={'calc(100vh - 75px)'}
        p={'24px'}
        gridTemplateColumns={'repeat(auto-fit, minmax(300px, 1fr))'}
        gap={'24px'}
        justifyContent={'center'}
        bgColor={'cyan.100'}
      >
        {data?.map((product) => {
          return <ProductCard productData={product} key={product.id} />;
        })}
      </Grid>
    </>
  );
}

export default App;
