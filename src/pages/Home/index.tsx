import React from 'react';
import Layout from '@components/features/Layout';
import { FriendSelector, FriendGiftRecommendation, TrendingGifts, Categories } from '@components/features/Home';

export default function Home() {
  return (
    <Layout>
      <FriendSelector />
      <Categories />
      <FriendGiftRecommendation />
      <TrendingGifts />
    </Layout>
  );
}
