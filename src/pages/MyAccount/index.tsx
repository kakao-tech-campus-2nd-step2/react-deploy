import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { OrderHistory } from '@/components/features/Order/OrderHistory/OrderHistory';
import { WishList } from '@/components/features/WishList/WishList';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      {authInfo?.name}님 안녕하세요! <Spacing height={64} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: '200px',
        }}
      >
        로그아웃
      </Button>
      <SegmentedUI />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;

const SegmentedUI = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>위시리스트</Tab>
        <Tab>주문내역</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <WishList />
        </TabPanel>
        <TabPanel>
          <OrderHistory />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SegmentedUI;
