import React from 'react';
import { themeStyles } from '../../styles/theme';
import BackgroundDecoration from './BackgroundDecoration';

// Page wrapper component
const PageWrapper = ({ children }) => (
  <div className={`pt-20 min-h-screen ${themeStyles.backgrounds.main} p-8 relative overflow-hidden`}>
    <BackgroundDecoration />
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default PageWrapper;
