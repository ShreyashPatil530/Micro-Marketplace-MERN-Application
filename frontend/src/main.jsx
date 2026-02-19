import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('DOM Content Loaded, starting React render...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Failed to find root element');
} else {
  ReactDOM.createRoot(rootElement).render(<App />)
}
