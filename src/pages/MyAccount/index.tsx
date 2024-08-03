import React from 'react';
import Layout from '@features/Layout';
import AccountOverview from '@features/Account/AccountOverview';
import WishList from '@features/Account/WishList';

export default function MyAccount() {
  return (
    <Layout>
      <AccountOverview />
      <WishList />
    </Layout>
  );
}
