import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import { updateBaseURL } from '@/api/instance';
import { Image } from '@/components/common/Image';
import { Container as CommonContainer } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';

export const SelectFriendsBanner = () => {
  const handleBaseURL = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    localStorage.setItem('environment', value);
    updateBaseURL(value);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const environment = localStorage.getItem('environment');
      if (environment) {
        updateBaseURL(environment);
      }
    };

    // 초기 로드 시 localStorage에서 환경 설정을 가져와 적용
    handleStorageChange();

    // 다른 탭에서의 변경을 감지
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center">
        <SelectImage
          src="https://gift-s.kakaocdn.net/dn/gift/images/m640/bg_profile_default.png"
          alt="친구 선택 유도 아이콘"
          onClick={() => {
            alert('선물 받을 친구 선택하기');
          }}
        />
        <Text>선물 받을 친구를 선택해주세요.</Text>
      </Container>
      <ApiSelection placeholder="BASE_URL을 선택해주세요" onChange={handleBaseURL}>
        <option value="김은선">김은선</option>
        <option value="박준석">박준석</option>
        <option value="안재민">안재민</option>
        <option value="이도훈">이도훈</option>
      </ApiSelection>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 76px;
  padding: 18px 16px;

  background: #fafafa;

  @media screen and (min-width: ${breakpoints.sm}) {
    height: 150px;
    padding: 40px 16px;
  }
`;

const Container = styled(CommonContainer)`
  align-content: space-between;
  height: 100%;
`;

const SelectImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 16px;
  cursor: pointer;

  @media screen and (min-width: ${breakpoints.sm}) {
    width: 70px;
    height: 70px;
    border-radius: 24px;
  }
`;

const Text = styled.p`
  padding-left: 16px;
  font-size: 17px;
  line-height: 22px;
  color: #333;
  font-weight: 500;

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 28px;
    line-height: 35px;
  }
`;

const ApiSelection = styled(Select)`
  margin: 10px;
`;
