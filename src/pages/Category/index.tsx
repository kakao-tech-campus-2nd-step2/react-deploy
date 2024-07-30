import React from 'react';
import Layout from '@features/Layout';
import GoodsItemList from '@features/Category/GoodsItemList';
import CategoryHeader from '@features/Category/CategoryHeader';

export default function Category() {
  return (
    <Layout>
      <CategoryHeader />
      <GoodsItemList />
    </Layout>
  );
}
