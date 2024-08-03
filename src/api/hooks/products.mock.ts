import { rest } from "msw";

import { getProductDetailPath } from "./useGetProductDetail";
import { getProductOptionsPath } from "./useGetProductOptions";
import { getProductsPath } from "./useGetProducts";

export const productsMockHandler = [
  rest.get(
    getProductsPath({
      categoryId: "2920",
    }),
    (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA));
    },
  ),
  rest.get(
    getProductsPath({
      categoryId: "2930",
    }),
    (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA));
    },
  ),
  rest.get(getProductDetailPath(":productId"), (_, res, ctx) => {
    return res(ctx.json(PRODUCTS_MOCK_DATA.products[0]));
  }),
  rest.get(getProductOptionsPath(":productId"), (_, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Option A",
          quantity: 10,
          productId: 1,
        },
        {
          id: 2,
          name: "Option B",
          quantity: 20,
          productId: 1,
        },
      ]),
    );
  }),
];

const PRODUCTS_MOCK_DATA = {
  products: [
    {
      id: 3245119,
      name: "[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)",
      imageUrl:
        "https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png",
      price: 145000,
      description:
        "소중한 사람에게 마음을 표현해 보세요.\r\n\r\n<카카오 선물하기 단독 각인 서비스 신청 방법>\r\nSTEP 1) 상품 선택: 원하는 상품 선택\r\nSTEP 2) 각인 문구 입력\r\n- 영문 대,소문자/숫자 입력 가능\r\n- 띄어쓰기 포함 최대 16자까지 입력가능\r\n- 각인 위치 변경 불가\r\n\r\n<각인 서비스 신청 시 유의사항>\r\n- 배송지 입력 후에는 각인 작업이 진행되어 각인 문구 변경을 불가하며 주문 제품의 결함 사유를 제외하고는 각인 디자인에 대한 불만족 사유 등으로 인한 교환/환불은 불가합니다.\r\n- 배송은 배송지 입력 후에 약 3-5일이 소요되며, 각인 작업 소요량에 따라 배송 일정은 변동될 수 있습니다.\r\n- 레이저 각인으로 인한 미세한 스크래치 느낌이 날 수 있습니다.",
      options: [
        {
          id: 1,
          name: "[옵션 1] 아쿠아 델라 레지나",
          quantity: 10000,
        },
        {
          id: 2,
          name: "[옵션 2] 엔젤 디 피렌체",
          quantity: 10000,
        },
        {
          id: 3,
          name: "[옵션 3] 타바코 토스카노",
          quantity: 10000,
        },
      ],
    },
    {
      id: 2263833,
      name: "외식 통합권 10만원권",
      imageUrl:
        "https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png",
      price: 100000,
    },
    {
      id: 6502823,
      name: "[선물포장/미니퍼퓸증정] 디켄터 리드 디퓨저 300ml + 메세지카드",
      imageUrl:
        "https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg",
      price: 108000,
    },
    {
      id: 1181831,
      name: "[선물포장] 소바쥬 오 드 뚜왈렛 60ML",
      imageUrl:
        "https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg",
      price: 122000,
    },
    {
      id: 1379982,
      name: "[정관장] 홍삼정 에브리타임 리미티드 (10ml x 30포)",
      imageUrl:
        "https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg",
      price: 133000,
    },
  ],
  hasNext: false,
};
