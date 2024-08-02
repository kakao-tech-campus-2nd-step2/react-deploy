import { useMember } from '@/api/hooks/useMember';

import { OneTextContainer } from '@/components/OneTextContainer';

import { MemberTable } from './MemberTable';

export const MemberSection = () => {
  const { members } = useMember({});

  if (!members) {
    return <OneTextContainer>유저가 없습니다.</OneTextContainer>;
  }

  return <MemberTable members={members} />;
};
