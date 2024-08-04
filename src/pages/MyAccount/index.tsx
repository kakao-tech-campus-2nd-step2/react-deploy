import {
  Button,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { TbParkingCircle } from 'react-icons/tb';

import useGetPoint from '@/api/hooks/useGetPoint';
import OrderListTab from '@/components/features/MyAccount/Tabs/OrderListTab';
import WishesTab from '@/components/features/MyAccount/Tabs/WishesTab';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const MyAccountPage = () => {
  const authInfo = useAuth();

  const { data: point } = useGetPoint();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <Flex w="100%" maxW="1024px" align="center">
        <Flex direction="column" mr="auto">
          <Text py="5">{authInfo?.name}님 안녕하세요!</Text>
          <Button w="fit-content" onClick={handleLogout}>
            로그아웃
          </Button>
        </Flex>
        <TbParkingCircle size="50" />
        <Text px="3">{point?.point}</Text>
      </Flex>
      <Tabs position="relative" w="100%" maxW="1024px" mt="10" variant="unstyled">
        <TabList>
          <Tab>위시리스트</Tab>
          <Tab>주문내역</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            <WishesTab />
          </TabPanel>
          <TabPanel>
            <OrderListTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
