import React from 'react';
import { Outlet } from 'react-router-dom';
import APIProvider from '@context/api/APiProvider';
import AuthProvider from '@context/auth/AuthProvider';
import FilterProvider from '@context/filter/FilterProvider';
import GlobalStyles from '@assets/styles';

function App() {
  return (
    <APIProvider>
      <FilterProvider>
        <AuthProvider>
          <GlobalStyles />
          <Outlet />
        </AuthProvider>
      </FilterProvider>
    </APIProvider>
  );
}

export default App;
