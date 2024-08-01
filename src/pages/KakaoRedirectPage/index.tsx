import { OneTextContainer } from '@/components/OneTextContainer';

import { RedirectSection } from './RedirectSection';

export const KakaoLoginRedirectionPage = () => {
  const code =
    new URL(document.location.toString()).searchParams.get('code') || '';

  if (!code) {
    return <OneTextContainer>잘못된 접근입니다.</OneTextContainer>;
  }

  return <RedirectSection code={code} />;
};
