import Page from '@components/templates/Page';
import CategorySection from '@components/organisms/main/category/CategorySection';
import Container from '@components/atoms/container/Container';
import Button from '@components/atoms/button/Button';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import Modal from '@components/atoms/modal/Modal';
import { useState } from 'react';
import AddCategoryForm from '@components/organisms/admin/AddProductForm';
import AddProductForm from '@components/organisms/admin/AddCategoryForm';
import CategoryContextProvider from '@/providers/CategoryContextProvider';

function AdminPage() {
  const [isCategoryModalOpened, setIsCategoryModalOpened] = useState(false);
  const [isProductModalOpened, setIsProductModalOpened] = useState(false);

  return (
    <CategoryContextProvider>
      <Page>
        <Container elementSize="full-width" flexDirection="column" justifyContent="center">
          <CategorySection displayDeleteButton />
        </Container>

        <Container
          elementSize="full-width"
          maxWidth={MAX_CONTENT_WIDTH}
          justifyContent="center"
          padding="15px"
          cssProps={{
            gap: '5px',
          }}
        >
          <Button
            theme="kakao"
            elementSize="responsive"
            text="테마 추가하기"
            onClick={() => {
              setIsCategoryModalOpened(true);
            }}
          />
          <Button
            theme="black"
            elementSize="responsive"
            text="상품 추가하기"
            onClick={() => {
              setIsProductModalOpened(true);
            }}
          />
        </Container>
      </Page>
      <Modal
        title="테마 추가하기"
        elementSize={{
          width: '500px',
          height: 'auto',
        }}
        isOpened={isCategoryModalOpened}
        setIsOpened={setIsCategoryModalOpened}
      >
        <AddCategoryForm />
      </Modal>

      <Modal
        title="상품 추가하기"
        elementSize={{
          width: '500px',
          height: 'auto',
        }}
        isOpened={isProductModalOpened}
        setIsOpened={setIsProductModalOpened}
      >
        <AddProductForm />
      </Modal>
    </CategoryContextProvider>
  );
}

export default AdminPage;
