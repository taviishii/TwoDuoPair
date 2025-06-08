import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LocationProvider } from './LocationContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </React.StrictMode>
);
