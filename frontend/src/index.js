import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { BookProvider } from './context/BookContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookProvider>
      <App />
    </BookProvider>
  </React.StrictMode>,
)