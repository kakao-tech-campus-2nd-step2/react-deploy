import { css } from '@emotion/react';

import { useFormContext } from 'react-hook-form';

import { Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';

import { OrderField } from '@/schema/index';

import { FormField } from '@/components/ui/Form';
import { Container } from '@/components/ui/Layout/Container';

export const PointField = () => {
  const { control } = useFormContext<OrderField>();

  return (
    <Container flexDirection="column" gap="1rem">
      <Container justifyContent="space-between" alignItems="center">
        <Text as="b">포인트 사용</Text>
        <Text>0 P</Text>
      </Container>
      <FormField
        control={control}
        name="point"
        render={({ field }) => (
          <InputGroup>
            <Input
              type="number"
              value={field.value}
              onChange={field.onChange}
              placeholder="0"
              css={inputStyle}
            />
            <InputRightElement>P</InputRightElement>
          </InputGroup>
        )}
      />
    </Container>
  );
};

const inputStyle = css({
  textAlign: 'end',
  paddingRight: '1.8rem',
  '::placeholder': {
    textAlign: 'end',
  },
});
