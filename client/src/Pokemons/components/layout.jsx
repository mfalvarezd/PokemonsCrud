// src/Pokemons/components/layout.jsx
import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ padding: '2rem' }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
