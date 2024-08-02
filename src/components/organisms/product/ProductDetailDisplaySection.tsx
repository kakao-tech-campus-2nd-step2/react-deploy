import Container from '@components/atoms/container/Container';
import Image from '@components/atoms/image/Image';
import { Divider, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/QueryKeys';
import { fetchProductDetail, fetchProductOptions } from '@utils/query';
import { useEffect } from 'react';
import Paths from '@constants/Paths';
import { useNavigate } from 'react-router-dom';
import ProductCounterForm from '@components/organisms/product/ProductCounterForm';
import { isNotFound } from '@utils/network';
import { ProductData, ProductOption } from '@/dto';

interface ProductDetailSectionProps {
  productId: number;
}

function ProductDetailDisplaySection({ productId }: ProductDetailSectionProps) {
  const { data: product, error: productFetchError } = useSuspenseQuery<ProductData>({
    queryKey: [QueryKeys.PRODUCT_DETAILS, productId],
    queryFn: () => fetchProductDetail({ productId: productId.toString() }),
  });
  const { data: options, error: optionsFetchError } = useSuspenseQuery<ProductOption[]>({
    queryKey: [QueryKeys.PRODUCT_OPTIONS, productId],
    queryFn: () => fetchProductOptions({ productId: productId.toString() }),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isNotFound(productFetchError) || isNotFound(optionsFetchError)) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [productFetchError, optionsFetchError, navigate, productId]);

  return (
    <>
      <Container cssProps={{ flexGrow: 1 }} padding="32px 0 80px">
        <Container maxWidth="450px" elementSize="full-width">
          <Image
            ratio="square"
            src={product.imageUrl}
          />
        </Container>
        <Container flexDirection="column" padding="24px">
          <Text fontSize="2xl">
            {product.name}
          </Text>
          <Text fontSize="3xl" paddingTop="16px">
            {`${product.price}원`}
          </Text>
          <Container
            elementSize="full-width"
            flexDirection="column"
            padding="24px 0"
            alignItems="center"
          >
            <Divider />
            <Text padding="16px 0" fontSize="sm">
              카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!
            </Text>
            <Divider />
          </Container>
        </Container>
      </Container>

      <ProductCounterForm
        productId={productId}
        productPrice={product.price}
        productName={product.name}
        productOptions={options}
      />
    </>
  );
}

export default ProductDetailDisplaySection;
