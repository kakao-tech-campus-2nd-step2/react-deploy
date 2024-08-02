import { css } from '@emotion/react';

import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

interface PointInputProps extends InputProps {}

export const PointInput = ({ ...props }: PointInputProps) => {
  return (
    <InputGroup>
      <Input type="number" css={inputStyle} {...props} />
      <InputRightElement>P</InputRightElement>
    </InputGroup>
  );
};

const inputStyle = css({
  textAlign: 'end',
  paddingRight: '1.8rem',
  '::placeholder': {
    textAlign: 'end',
  },
});
