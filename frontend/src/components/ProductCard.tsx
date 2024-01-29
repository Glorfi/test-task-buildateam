import { Card, CardBody, Box } from '@chakra-ui/react';
import { ImageCanvas } from './ImageCanvas';
import { IProduct } from '../interfaces/responses/getAllProducts';

interface IProductCardProps {
  productData: IProduct;
}

export const ProductCard = (props: IProductCardProps) => {
  const { productData } = props;
  return (
    <Card width={'100%'}>
      <CardBody display={'flex'} flexDirection={'column'} alignItems={'center'}>
        {productData?.images.map((image) => {
          return (
            <ImageCanvas
              imageSrc={image.src}
              width={260}
              key={productData.id}
            />
          );
        })}
        {productData ? (
          <Box
            width={'100%'}
            maxHeight={'300px'}
            overflowX={'hidden'}
            overflowY={'scroll'}
            dangerouslySetInnerHTML={{ __html: productData?.bodyHTML }}
          ></Box>
        ) : null}
      </CardBody>
    </Card>
  );
};
