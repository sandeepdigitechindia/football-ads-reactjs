import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const Layout = ({ children }) => {
  return (
    <div>
      <Breadcrumbs />
      {children}
    </div>
  );
};

export default Layout;
