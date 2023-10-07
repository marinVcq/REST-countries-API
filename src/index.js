import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/main.css';
import App from './App';

// Theme context for dark and light mode
import { ThemeProvider } from './components/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App /> 
    </ThemeProvider>

  </React.StrictMode>
);