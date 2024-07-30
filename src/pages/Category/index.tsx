import React from 'react';
import Layout from '@components/features/Layout';
import GoodsItemList from '@components/features/Category/GoodsItemList';
import CategoryHeader from '@components/features/Category/CategoryHeader';

export default function Category() {
  return (
    <Layout>
      <CategoryHeader />
      <GoodsItemList />
    </Layout>
  );
}
