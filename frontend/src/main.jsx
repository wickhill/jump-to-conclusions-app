import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { UserProvider } from './UserContext';

createRoot(document.getElementById('root')).render(
    <Router>
        <UserProvider>
            <App />
        </UserProvider>
    </Router>
);
