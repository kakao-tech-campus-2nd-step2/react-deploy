import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

export interface PageWrapperProps {
  children: ReactNode;
}

export default function Layout({ children }: PageWrapperProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
