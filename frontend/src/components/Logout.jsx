import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout({onLogout}) {
const navigate = useNavigate();
const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove the token from local storage
    onLogout(null)
    navigate('/'); // Navigate to the welcome page
    };

    return (
    <div className="logout-container">
    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-white-700 hover:bg-white-100">
        Logout
    </button>
    </div>
    );
}

export default Logout;