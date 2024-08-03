import Container from '@components/atoms/container/Container';
import Image from '@components/atoms/image/Image';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Paths from '@constants/Paths';
import ResponsiveContainer
  from '@components/atoms/container/ResponsiveContainer';
import { BREAKPOINT_SM } from '@styles/size';
import styled from '@emotion/styled';
import { useCallback, useContext } from 'react';
import RemoveButton from '@components/atoms/button/RemoveButton';
import { deleteCategory } from '@utils/query';
import { isAxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { CategoryContext } from '@/providers/CategoryContextProvider';

interface CategoryItemProps {
  categoryId: number;
  displayDeleteButton?: boolean;
}

const ResponsiveCategoryCaption = styled.p`
  font-size: 16px;
  padding-top: 7px;
  @media (max-width: ${BREAKPOINT_SM}) {
    font-size: 13px;
  }
`;

function MainCategoryItem({ categoryId, displayDeleteButton }: CategoryItemProps) {
  const { categories, refetch } = useContext(CategoryContext);
  const category = categories[categoryId];

  const handleClickDelete = useCallback(async () => {
    if (!displayDeleteButton) return;

    try {
      const res = window.confirm('카테고리를 삭제하시겠어요?');

      if (res) {
        await deleteCategory({ categoryId });
        alert('삭제가 완료되었습니다.');
        refetch();
      }
    } catch (e) {
      console.error(e);

      if (!isAxiosError(e)) {
        return;
      }

      if (e.response?.status === StatusCodes.BAD_REQUEST) {
        alert('잘못된 category Id입니다.');

        return;
      }

      alert('카테고리를 삭제하는 중 에러가 발생했어요.');
    }
  }, [displayDeleteButton, categoryId, refetch]);

  return (
    <Container padding="13px 0px 12px">
      <Container
        elementSize="full-width"
        flexDirection="column"
        alignItems="center"
        cssProps={{
          position: 'relative',
        }}
      >

        { displayDeleteButton ? (
          <RemoveButton onClick={handleClickDelete}>X</RemoveButton>
        ) : null}

        <Link to={Paths.CATEGORY_PAGE(categoryId)}>
          <ResponsiveContainer
            sizeDefault={{ width: '90px', height: '90px' }}
            sizeSm={{ width: '50px', height: '50px' }}
          >

            <Image
              src={category.imageUrl}
              ratio="square"
              css={css`
                border-radius: 32px;
                @media (max-width: ${BREAKPOINT_SM}) {
                  border-radius: 18px;
                }
            `}
            />
          </ResponsiveContainer>
        </Link>

        <Link to={Paths.CATEGORY_PAGE(categoryId)}>
          <ResponsiveCategoryCaption>
            {category.name}
          </ResponsiveCategoryCaption>
        </Link>
      </Container>
    </Container>
  );
}

export default MainCategoryItem;
