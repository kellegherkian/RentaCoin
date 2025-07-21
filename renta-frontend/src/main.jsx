// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import Login from './Login-page/Login.jsx';
import SignIn from './Login-page/SignIn.jsx'; // New login page

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
