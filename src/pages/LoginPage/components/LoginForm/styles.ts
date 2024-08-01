import { css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const formContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  border: 'none',
  padding: '4rem 3rem 2rem',
  '@media (min-width: 768px)': {
    border: `0.1rem solid ${colors.gray[200]}`,
  },
});

export const buttonStyle = css({
  marginTop: '2rem',
});
