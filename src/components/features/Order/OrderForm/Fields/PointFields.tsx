import { Input } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import { useGetPoints } from "@/api/hooks/usePoint";
import { Spacing } from "@/components/common/layouts/Spacing";
import { useOrderFormContext } from "@/hooks/useOrderFormContext";

import { LabelText } from "../Common/LabelText";

export const PointFields = () => {
  const { control, setValue, watch } = useOrderFormContext();
  const { data } = useGetPoints();
  const pointValue = watch("point");

  useEffect(() => {
    if ((pointValue ?? 0) > (data?.point ?? 0)) {
      setValue("point", data?.point ?? 0);
    }
  }, [data?.point, pointValue, setValue]);

  return (
    <Wrapper>
      <LabelText>포인트 사용</LabelText>
      <Spacing height={10} />
      <Controller
        control={control}
        name="point"
        render={({ field: { onChange, value, ref } }) => (
          <Input
            type="number"
            ref={ref}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (newValue <= (data?.point ?? 0)) {
                onChange(e);
              }
            }}
            value={value}
            placeholder="포인트를 입력해주세요."
            min={0}
          />
        )}
      />
      <Spacing height={10} />
      <LabelText>사용 가능 포인트: {data?.point ?? 0}</LabelText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;
