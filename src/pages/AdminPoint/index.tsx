import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { useGetMembersPoint } from '@/api/hooks/useGetMemebersPoint';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { LoadingView } from '@/components/common/View/LoadingView';
// import { useAuth } from '@/provider/Auth/AuthContext';
import { usePatchMemberPoint } from '@/api/hooks/usePatchMemberPoint';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

export const AdminPointPage = () => {
    const [onesPoint, setOnesPoint] = useState<number[]>([]);

    const { patchMemberPoint } = usePatchMemberPoint();
    const { membersPoint, error, loading } = useGetMembersPoint();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'ADMIN') {
            alert('관리자 권한이 없습니다.');
            window.location.replace('/');
        }
    }, [])

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'ADMIN') {
            alert('관리자 권한이 없습니다.');
            window.location.replace('/');
        }

        if (membersPoint) {
            setOnesPoint(new Array(membersPoint.length).fill(0));
        }
    }, [membersPoint]);

    const handlePointChange = (index: number, valueString: string) => {
        const value = parseInt(valueString, 10);
        const newPoints = [...onesPoint];
        newPoints[index] = isNaN(value) ? 0 : value;
        setOnesPoint(newPoints);
    };

    const handleDeleteWish = async (index: number, memberId: string) => {
        try {
            const response = await patchMemberPoint({ depositPoint: onesPoint[index] }, memberId);

            if (typeof response === 'number') {
                alert('포인트 추가되었습니다.')
                window.location.reload();
            } else {
                alert(response);
            }
        } catch (error) {
            alert('포인트 추가에 실패하였습니다.')
        }
    };

    const handleLogout = () => {
        authSessionStorage.set(undefined);
        const redirectURL = `${window.location.origin}${RouterPath.home}`;
        window.location.replace(redirectURL);
    };

    if (loading) return <LoadingView />;
    if (error) return <TextView>에러가 발생했습니다.</TextView>;
    if (membersPoint && membersPoint.length <= 0) return <TextView>멤버가 없어요.</TextView>;

    return (
        <Wrapper>
            <WishWrapper>
                <WishTitle>Members Point</WishTitle>
                <Container>
                    <Grid
                        columns={{ initial: 2, md: 1 }}
                        gap={16}
                    >
                        {membersPoint ? membersPoint.map(({ id, email, name, point }, index) => (
                            <WishContentWrapper key={id} style={{ height: "115px" }}>
                                <WishInfo>
                                    <WishProduct>{name}</WishProduct>
                                    <WishProduct>{email}</WishProduct>
                                    <WishPrice>{point}</WishPrice>
                                </WishInfo>
                                <NumberInput
                                    onChange={(valueString) => handlePointChange(index, valueString)}
                                    value={onesPoint[index] !== undefined ? onesPoint[index].toString() : ''}
                                    step={1000}
                                    style={{ position: 'absolute', right: '150px' }}
                                >
                                    <NumberInputField style={{ height: '55px' }} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Button
                                    onClick={() => handleDeleteWish(index, id.toString())}
                                    theme='darkGray'
                                    style={{ width: "100px", position: "absolute", right: "20px" }}
                                >
                                    포인트 추가
                                </Button>
                            </WishContentWrapper>
                        )) : ''}
                    </Grid>
                </Container>
            </WishWrapper>
            <Button
                size="small"
                theme="darkGray"
                onClick={handleLogout}
                style={{ maxWidth: '200px' }}
            >
                로그아웃
            </Button>
        </Wrapper>
    );
};





// import styled from '@emotion/styled';
// import { useEffect, useState } from 'react';

// import { useGetMembersPoint } from '@/api/hooks/useGetMemebersPoint';
// import { Button } from '@/components/common/Button';
// import { Container } from '@/components/common/layouts/Container';
// import { Grid } from '@/components/common/layouts/Grid';
// import { LoadingView } from '@/components/common/View/LoadingView';
// import { useAuth } from '@/provider/Auth/AuthContext';
// import { RouterPath } from '@/routes/path';
// import { authSessionStorage } from '@/utils/storage';

// import {
//     NumberInput,
//     NumberInputField,
//     NumberInputStepper,
//     NumberIncrementStepper,
//     NumberDecrementStepper,
// } from '@chakra-ui/react'

// export const AdminPointPage = () => {
//     // const authInfo = useAuth();
//     const [onesPoint, setOnesPoint] = useState<number[]>([]);

//     const { membersPoint, error, loading } = useGetMembersPoint();

//     if (loading) return <LoadingView />;
//     if (error) return <TextView>에러가 발생했습니다.</TextView>;
//     if (membersPoint && membersPoint.length <= 0) return <TextView>멤버가 없어요.</TextView>;

//     useEffect(() => {
//         if (membersPoint) {
//             setOnesPoint(new Array(membersPoint.length).fill(0));
//         }
//     }, [membersPoint]);

//     const handlePointChange = (index: number, value: number) => {
//         const newPoints = [...onesPoint];
//         newPoints[index] = value;
//         setOnesPoint(newPoints);
//     };

//     const handleDeleteWish = async () => {
//         // const response = await deleteWish(productId);

//         // if (response === 200) {
//         // alert('위시 상품에서 삭제되었습니다.');
//         // window.location.reload();
//         // } else {
//         // alert(response);
//         // }
//     }

//     const handleLogout = () => {
//         authSessionStorage.set(undefined);

//         const redirectURL = `${window.location.origin}${RouterPath.home}`;
//         window.location.replace(redirectURL);
//     };

//     return (
//         <Wrapper>
//             <WishWrapper>
//                 <WishTitle>Members Point</WishTitle>
//                 <Container>
//                     <Grid
//                         columns={{
//                             initial: 2,
//                             md: 1,
//                         }}
//                         gap={16}
//                     >
//                         {membersPoint ? membersPoint.map(({ id, email, name, point }, index) => (
//                             <WishContentWrapper style={{ height: "115px" }}>
//                                 <WishInfo key={id}>
//                                     <WishProduct>{name}</WishProduct>
//                                     <WishProduct>{email}</WishProduct>
//                                     <WishPrice>{point}</WishPrice>
//                                 </WishInfo>
//                                 <NumberInput
//                                     onChange={(value) => handlePointChange(index, parseInt(value))}
//                                     value={onesPoint[index]}
//                                 >
//                                     <NumberInputField />
//                                     <NumberInputStepper>
//                                         <NumberIncrementStepper />
//                                         <NumberDecrementStepper />
//                                     </NumberInputStepper>
//                                 </NumberInput>
//                                 <Button onClick={() => handleDeleteWish()} theme='darkGray' style={{ width: "100px", position: "absolute", right: "20px" }}>포인트 추가</Button>
//                             </WishContentWrapper>
//                         )) : ''}
//                     </Grid>
//                 </Container>
//             </WishWrapper>
//             <Button
//                 size="small"
//                 theme="darkGray"
//                 onClick={handleLogout}
//                 style={{
//                     maxWidth: '200px',
//                 }}
//             >
//                 로그아웃
//             </Button>
//         </Wrapper>
//     );
// };

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

const WishWrapper = styled.div`
  width: 70%;
  margin-bottom: 20px;
`

const WishTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
`

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const WishContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: row;
  height: 150px;
  border: 1px solid #ededed;
  border-radius: 2px;
  padding: 13px 14px;
  align-items: center;
  position: relative;

  img {
    width: 85px;
    height: 85px;
    object-fit: cover;
  }
`

const WishInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  justify-content: center;
`

const WishProduct = styled.div`
  font-size: 18px;
  font-weight: 400;
`

const WishPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
`