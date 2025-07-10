import React from 'react';
import Navbar from '../Navbar';

// Layout component that includes Navbar
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </>
  );
}

export default Layout;
