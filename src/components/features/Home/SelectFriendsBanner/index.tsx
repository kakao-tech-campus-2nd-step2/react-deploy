// import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelectApi } from '@/api/instance'; // 훅을 사용
import { Image } from '@/components/common/Image';
import { Container as CommonContainer } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';

export const SelectFriendsBanner = () => {
  const { selectedApi, setSelectedApi } = useSelectApi();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedApi(event.target.value);
  };

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
        <select onChange={handleSelectChange} value={selectedApi}>
          <option value="https://api1.example.com">사람 1 API</option>
          <option value="http://13.209.12.98:8080">사람 2 API</option>
          <option value="https://api3.example.com">사람 3 API</option>
        </select>
      </Container>
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
  height: 100%;
  display: flex;
  justify-content: "space-between"
`;

const SelectImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 30px;
  @media screen and (min-width: ${breakpoints.md}) {
    width: 70px;
    height: 70px;
    border-radius: 24px;
  }
`;

const Text = styled.p`
  margin-right: 400px;  
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

