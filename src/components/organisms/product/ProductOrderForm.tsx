import { css } from '@emotion/react';
import { defaultBorderColor } from '@styles/colors';
import Container from '@components/atoms/container/Container';
import ProductMessageForm from '@components/organisms/product/ProductMessageForm';
import ProductOrderHistorySection from '@components/organisms/product/ProductOrderHistorySection';
import ProductReceiptForm from '@components/organisms/product/ProductReceiptForm';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/QueryKeys';
import { fetchProductDetail, requestOrder } from '@utils/query';
import { useNavigate } from 'react-router-dom';
import Paths from '@constants/Paths';
import { orderHistoryStorage } from '@utils/storage';
import { OrderRequestBody } from '@/types/request';
import { OrderFormData, OrderHistoryData } from '@/types';
import { CashReceiptOptions } from '@/constants';
import { ProductData } from '@/dto';

interface ProductOrderFormProps {
  orderHistory: OrderHistoryData;
}

function ProductOrderForm({ orderHistory }: ProductOrderFormProps) {
  const {
    data: product,
  } = useSuspenseQuery<ProductData>({
    queryKey: [QueryKeys.PRODUCT_DETAILS, orderHistory.productId],
    queryFn: () => fetchProductDetail({ productId: orderHistory.productId.toString() }),
  });
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    control,
    watch,
  } = useForm<OrderFormData>({
    mode: 'onChange',
    defaultValues: {
      messageCardTextMessage: '',
      hasCashReceipt: false,
      cashReceiptType: CashReceiptOptions.PERSONAL,
      cashReceiptNumber: '',
      usePoint: false,
      pointAmount: 0,
    },
  });

  const onSubmit = useCallback(async (data: OrderFormData) => {
    if (!orderHistory) return;

    const orderBody: OrderRequestBody = {
      optionId: orderHistory.option.id,
      message: data.messageCardTextMessage as string,
      quantity: orderHistory.quantity,
      point: data.usePoint ? data.pointAmount : 0,
    };
    try {
      await requestOrder(orderBody);
      alert('상품 주문이 완료되었습니다.');
      navigate(Paths.MAIN_PAGE);
      orderHistoryStorage.set(); // clear order history
    } catch (e) {
      alert('상품 주문 중 에러가 발생했습니다.');
    }
  }, [orderHistory, navigate]);

  useEffect(() => {
    if (!product) navigate(Paths.MAIN_PAGE);
  }, [product, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        display: flex;
        width: 100%;
        max-width: 1280px;
        border-right: 1px solid ${defaultBorderColor};
        border-left: 1px solid ${defaultBorderColor};
      `}
    >
      <Container
        elementSize="full-width"
        alignItems="center"
        flexDirection="column"
        padding="44px 0px 32px"
      >
        <ProductMessageForm
          register={register}
          errors={errors}
        />
        <ProductOrderHistorySection
          productDetails={product}
          count={orderHistory.quantity}
          option={orderHistory.option}
        />
      </Container>
      <Container
        elementSize="full-width"
        alignItems="center"
        flexDirection="column"
        maxWidth="360px"
      >
        <ProductReceiptForm
          productDetails={product}
          count={orderHistory.quantity}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          control={control}
          watch={watch}
        />
      </Container>
    </form>
  );
}

export default ProductOrderForm;
