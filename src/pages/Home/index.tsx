import React from 'react';
import Layout from '@features/Layout';
import { FriendSelector, FriendGiftRecommendation, TrendingGifts, Categories } from '@features/Home';

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
