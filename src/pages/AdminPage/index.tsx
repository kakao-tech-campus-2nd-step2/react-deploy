import BaseLayout from '@/layouts/BaseLayout';

import { Content } from '@/components/Content';

import { MemberSection } from './MemberSection';

export const AdminPage = () => {
  return (
    <BaseLayout>
      <Content padding="2rem 0">
        <MemberSection />
      </Content>
    </BaseLayout>
  );
};
