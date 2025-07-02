import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './styles/main.scss';
import { ThemeProvider } from './context/Theme';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
