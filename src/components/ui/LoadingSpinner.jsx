import React from 'react';
import { themeStyles } from '../../styles/theme';

// Loading spinner
const LoadingSpinner = () => (
  <div className={`min-h-screen flex items-center justify-center ${themeStyles.backgrounds.main}`}>
    <div className="relative">
      <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      <div className="mt-4 text-center text-white font-medium">Loading...</div>
    </div>
  </div>
);

export default LoadingSpinner;
