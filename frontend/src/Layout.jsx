import React from 'react';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

