import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Two from './Two';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Two />
  </React.StrictMode>
);
