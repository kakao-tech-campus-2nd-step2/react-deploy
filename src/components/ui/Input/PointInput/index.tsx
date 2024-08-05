import { css } from '@emotion/react';

import { forwardRef } from 'react';

import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

interface PointInputProps extends InputProps {}

export const PointInput = forwardRef<HTMLInputElement, PointInputProps>(
  ({ ...props }, ref) => {
    return (
      <InputGroup>
        <Input
          type="number"
          css={inputStyle}
          ref={ref} // ref를 Input에 전달
          {...props}
        />
        <InputRightElement>P</InputRightElement>
      </InputGroup>
    );
  }
);

const inputStyle = css({
  textAlign: 'end',
  paddingRight: '1.8rem',
  '::placeholder': {
    textAlign: 'end',
  },
});
