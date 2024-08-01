import { Checkbox, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';

import { LabelText } from '../Common/LabelText';

type PointFieldsProps = {
  onPointChange: (point: number) => void;
};

const PointFields = ({ onPointChange }: PointFieldsProps) => {
  const { register, control, watch } = useOrderFormContext();
  const pointAmount = watch('pointAmount') || '0';

  useEffect(() => {
    onPointChange(Number(pointAmount) || 0);
  }, [pointAmount, onPointChange]);

  return (
    <Wrapper>
      <Controller
        control={control}
        name="usePoint"
        render={({ field: { onChange, value, ref } }) => (
          <Checkbox ref={ref} onChange={onChange} isChecked={value} colorScheme="yellow" size="lg">
            <LabelText>포인트 사용</LabelText>
          </Checkbox>
        )}
      />
      <Spacing height={9} />
      <Input {...register('pointAmount')} placeholder="포인트 입력" />
    </Wrapper>
  );
};

export default PointFields;

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;
