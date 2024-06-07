import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UpdateUserProfile from './components/UpdateUserProfile';
import History from './pages/History';
import Achievements from './pages/Achievements'; // Ensure this path is correct
import { UserProvider, UserContext } from './UserContext';
import Logout from './components/Logout';

function App() {
    const { user, setUser, randomizerFunction, onLogout } = useContext(UserContext);
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    // Currently, this needs to be both here AND in `Achievements.jsx to dynamically render cheeves.
    const fetchAchievements = async () => {
        if (user && user._id) {
            const url = `http://localhost:3000/user/${user._id}/achievements`;
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (!data.user || !data.user.achievements) {
                throw new Error('Achievements data is not available in the response');
            }

            const achievementsMap = new Map(Object.entries(data.user.achievements));
            const updatedAchievements = achievementsData.map(achievement => ({
                ...achievement,
                isUnlocked: achievementsMap.get(achievement.name) || false
            }));
            setAchievements(updatedAchievements);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAchievements();
        }
    }, [user]);

    return (
        <div id="root">
            <Navbar user={user} onLogout={() => { setUser(null); localStorage.removeItem('user'); onLogout(); }} />
            <Routes>
                <Route path="/" element={<Home fetchAchievements={fetchAchievements} />} />
                <Route path="/signin" element={<Signin onSignin={setUser} />} />
                <Route path="/signup" element={<Signup onSignup={setUser} />} />
                {user && (
                    <>
                        <Route path="/updateProfile" element={<UpdateUserProfile />} />
                        <Route path="/:id/history" element={<History />} />
                        <Route path="/:id/achievements" element={<Achievements user={user} fetchAchievements={fetchAchievements} />} />
                    </>
                )}
            </Routes>
            <Footer user={user} onRandomize={randomizerFunction} />
        </div>
    );
}

export default function AppWrapper() {
    return (
        <UserProvider>
            <App />
        </UserProvider>
    );
}
