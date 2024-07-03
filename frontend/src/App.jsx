import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UpdateUserProfile from './components/UpdateUserProfile';
import Achievements from './pages/Achievements';
import { UserProvider, UserContext } from './UserContext';
const backendUrl = import.meta.env.VITE_APP_CLIENT_BACKEND_URL;
import Logout from './components/Logout';

function App() {
    const { user, setUser, onLogout, unlockedAchievements, setUnlockedAchievements, achievementsData, fetchAchievementsData } = useContext(UserContext);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        fetchAchievementsData();
    }, [fetchAchievementsData]);

    const fetchAchievements = async () => {
        if (user && user._id) {
            const url = `${backendUrl}/user/${user._id}/achievements`;
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

            if (!data.user || !data.user.unlockedAchievements) {
                throw new Error('Achievements data is not available in the response');
            }

            const unlockedAchievementsMap = new Map(Object.entries(data.user.unlockedAchievements));
            const updatedAchievements = achievementsData.map(achievement => ({
                ...achievement,
                isUnlocked: unlockedAchievementsMap.get(achievement.name) || false
            }));
            setUnlockedAchievements(updatedAchievements);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAchievements();
        }
    }, [user, achievementsData]); // include achievementsData dependency

    return (
        <div id="root">
            <Navbar user={user} onLogout={onLogout} />
            <Routes>
                <Route path="/" element={<Home fetchAchievements={fetchAchievements} unlockedAchievements={unlockedAchievements} achievementsData={achievementsData} />} />
                <Route path="/signin" element={<Signin onSignin={setUser} />} />
                <Route path="/signup" element={<Signup onSignup={setUser} />} />
                {user && (
                    <>
                        <Route path="/updateProfile" element={<UpdateUserProfile />} />
                        <Route path="/:id/achievements" element={<Achievements user={user} fetchAchievements={fetchAchievements} unlockedAchievements={unlockedAchievements} />} />
                    </>
                )}
            </Routes>
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
