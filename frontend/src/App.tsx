import { useEffect, useState } from 'react';
// import './App.css';
import { useGetAllProductsQuery } from './store/graphql-api/graphql.api';
import {
  Box,
  Card,
  CardBody,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IProduct } from './interfaces/responses/getAllProducts';
import { ImageCanvas } from './components/ImageCanvas';
import { ProductCard } from './components/ProductCard';

function App() {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const { data, isLoading } = useGetAllProductsQuery('');

  useEffect(() => {
    console.log(data);
    if (data) {
      setProductData(data[0]);
    }
  }, [data]);

  return (
    <>
      <HStack bgColor={'cyan.800'} w={'100%'} p={'24px'}>
        <Text fontWeight={'500'} color={'white'} fontSize={'large'}>
          Test Task for Buildateam
        </Text>
      </HStack>
      <Grid
        width={'100%'}
        minHeight={"calc(100vh - 75px)"}
        p={'24px'}
        gridTemplateColumns={'repeat(auto-fit, minmax(300px, 1fr))'}
        gap={'24px'}
        justifyContent={'center'}
        bgColor={"cyan.100"}
      >
        {data?.map((product) => {
          return <ProductCard productData={product} key={product.id} />;
        })}
      </Grid>
    </>
  );
}

export default App;
