import styled from "@emotion/styled";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { AddOrderRequestParams } from "@/api/hooks/useOrder";
import { useAddOrder } from "@/api/hooks/useOrder";
import { Spacing } from "@/components/common/layouts/Spacing";
import { SplitLayout } from "@/components/common/layouts/SplitLayout";
import { RouterPath } from "@/routes/path";
import type { OrderFormData, OrderHistory } from "@/types";

import { HEADER_HEIGHT } from "../../Layout/Header";
import { GoodsInfo } from "./GoodsInfo";
import { OrderFormMessageCard } from "./MessageCard";
import { OrderFormOrderInfo } from "./OrderInfo";

type Props = {
  orderHistory: OrderHistory;
};

export const OrderForm = ({ orderHistory }: Props) => {
  const { productId: id, count, optionId } = orderHistory;
  const navigate = useNavigate();

  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: id,
      optionId: optionId,
      quantity: count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      cashReceiptType: "PERSONAL",
      cashReceiptNumber: "",
      messageCardTextMessage: "",
      point: 0,
    },
  });
  const { handleSubmit } = methods;

  const { mutate: addOrder } = useAddOrder();

  const handleForm = async (values: OrderFormData) => {
    const { errorMessage, isValid } = validateOrderForm(values);

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    const params: AddOrderRequestParams = {
      productId: values.productId,
      productQuantity: values.quantity,
      hasCashReceipt: values.hasCashReceipt,
      cashReceiptType: values.cashReceiptType || "",
      cashReceiptNumber: values.cashReceiptNumber || "",
      message: values.messageCardTextMessage,
      point: values.point || 0,
    };

    try {
      await addOrder(params);
      alert(`주문이 완료되었습니다.`);
      navigate(RouterPath.home);
    } catch (error) {
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  // Submit 버튼을 누르면 form이 제출되는 것을 방지하기 위한 함수
  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    if (e.key === "Enter" && !["TEXTAREA"].includes(target.tagName)) {
      e.preventDefault();
    }
  };

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(handleForm)} onKeyDown={preventEnterKeySubmission}>
        <SplitLayout sidebar={<OrderFormOrderInfo orderHistory={orderHistory} />}>
          <Wrapper>
            <OrderFormMessageCard />
            <Spacing height={8} backgroundColor="#ededed" />
            <GoodsInfo orderHistory={orderHistory} />
          </Wrapper>
        </SplitLayout>
      </form>
    </FormProvider>
  );
};

const validateOrderForm = (values: OrderFormData): { errorMessage?: string; isValid: boolean } => {
  if (values.hasCashReceipt) {
    if (!values.cashReceiptNumber) {
      return {
        errorMessage: "현금영수증 번호를 입력해주세요.",
        isValid: false,
      };
    }

    if (!/^\d+$/.test(values.cashReceiptNumber)) {
      return {
        errorMessage: "현금영수증 번호는 숫자로만 입력해주세요.",
        isValid: false,
      };
    }
  }

  if (values.messageCardTextMessage.length < 1) {
    return {
      errorMessage: "메시지를 입력해주세요.",
      isValid: false,
    };
  }

  if (values.messageCardTextMessage.length > 100) {
    return {
      errorMessage: "메시지는 100자 이내로 입력해주세요.",
      isValid: false,
    };
  }

  return {
    isValid: true,
  };
};

const Wrapper = styled.div`
  border-left: 1px solid #e5e5e5;
  height: calc(100vh - ${HEADER_HEIGHT});
`;
