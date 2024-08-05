import BaseLayout from '@/layouts/BaseLayout';

import { BannerBottom } from './components/BannerBottom';
import { BannerTop } from './components/BannerTop';
import { CategorySection } from './components/CategorySection';

export const HomePage = () => {
  return (
    <BaseLayout>
      <BannerTop />
      <CategorySection />
      <BannerBottom />
    </BaseLayout>
  );
};
