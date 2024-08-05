import { css } from '@emotion/react';

import { breakpoint } from '@/styles/variants/breakpoint';

export const containerStyle = css({
  flexDirection: 'column',
  width: '100%',
  [`@media screen and (min-width: ${breakpoint.md})`]: {
    flexDirection: 'row',
  },
});
