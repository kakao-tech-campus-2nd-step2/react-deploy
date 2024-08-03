import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@components/common';
import { useAuth } from '@context/auth/useAuth';
import { useGetPoint } from '@apis/point/useGetPoint';

export default function AccountOverview() {
  const { userEmail, logout } = useAuth();
  const { data } = useGetPoint();

  return (
    <MyAccountContainer>
      <Greeting>{userEmail}님 안녕하세요!</Greeting>
      <Point>{`사용 가능한 포인트: ${data?.point}`}</Point>
      <ButtonContainer>
        <Button size="small" theme="darkGray" onClick={logout}>
          로그아웃
        </Button>
      </ButtonContainer>
    </MyAccountContainer>
  );
}

const MyAccountContainer = styled.section`
  padding-top: 140px;
  padding-bottom: 120px;
`;

const Greeting = styled.p`
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Point = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
`;

const ButtonContainer = styled.div`
  max-width: 200px;
  margin: 0 auto;
`;
