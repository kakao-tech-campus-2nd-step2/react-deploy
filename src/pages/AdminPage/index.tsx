import BaseLayout from '@/layouts/BaseLayout';

import { Content } from '@/components/Content';

import { MemberTable } from './MemberTable';

export const AdminPage = () => {
  return (
    <BaseLayout>
      <Content padding="2rem 0">
        <MemberTable />
      </Content>
    </BaseLayout>
  );
};
