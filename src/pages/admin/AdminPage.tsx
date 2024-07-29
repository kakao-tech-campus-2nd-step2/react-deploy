import Page from '@components/templates/Page';
import CategorySection from '@components/organisms/main/category/CategorySection';
import Container from '@components/atoms/container/Container';
import CategoryContextProvider from '@/providers/CategoryContextProvider';

function AdminPage() {
  return (
    <CategoryContextProvider>
      <Page>
        <Container elementSize="full-width" flexDirection="column">
          <CategorySection displayDeleteButton />
        </Container>
      </Page>
    </CategoryContextProvider>
  );
}

export default AdminPage;
