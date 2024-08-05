import { useFormContext } from 'react-hook-form';

import { Text, useNumberInput } from '@chakra-ui/react';

import { useMyPoint } from '@/api/hooks/useMyPoint';
import { OrderField } from '@/schema/index';

import { FormField } from '@/components/ui/Form';
import { PointInput } from '@/components/ui/Input/PointInput';
import { Container } from '@/components/ui/Layout/Container';

export const PointField = () => {
  const { control, setValue } = useFormContext<OrderField>();
  const { data: point } = useMyPoint();

  const { getInputProps } = useNumberInput({
    step: 1,
    defaultValue: '',
    min: 0,
    max: point,
    onChange: (value) => {
      setValue('point', value);
    },
  });

  const input = getInputProps();

  return (
    <Container flexDirection="column" gap="1rem">
      <Container justifyContent="space-between" alignItems="center">
        <Text as="b">포인트 사용</Text>
        <Text>{point} P</Text>
      </Container>
      <FormField
        control={control}
        name="point"
        render={() => <PointInput {...input} placeholder={point.toString()} />}
      />
    </Container>
  );
};
