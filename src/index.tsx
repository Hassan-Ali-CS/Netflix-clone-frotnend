//Entry Point
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18+
import App from './App';
import './index.css'; // Make sure you have this file or remove the line

// Get the root element from the DOM
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}

// Use React 18's createRoot API
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
