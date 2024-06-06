import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signin from "./components/Signin";
import Signup from './components/Signup';
import UpdateUserProfile from './components/UpdateUserProfile';
import History from './pages/History';
import Achievements from './pages/Achievements';
import Logout from './components/Logout';

function App() {
    const [user, setUser] = useState(null);
    const [randomizerFunction, setRandomizerFunction] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [resetFunction, setResetFunction] = useState(() => () => {});

    useEffect(() => {
        if (!user) {
            setRandomizerFunction(null);
        }
    }, [user]);

    const fetchAchievements = async () => {
        if (user && user._id) {
            const url = `http://localhost:3000/user/${user._id}/achievements`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                const achievementsMap = new Map(Object.entries(data.user.achievements));
                const updatedAchievements = achievementsData.map(achievement => ({
                    ...achievement,
                    isUnlocked: achievementsMap.get(achievement.name) || false
                }));
                setAchievements(updatedAchievements);
            }
        }
    };

    return (
        <div id="root">
            <Navbar user={user} onLogout={() => { setUser(null); resetFunction(); }} />
            <Routes>
                <Route path="/" element={<Home setRandomizerFunction={setRandomizerFunction} fetchAchievements={fetchAchievements} user={user} setResetFunction={setResetFunction} />} />
                {!user && <Route path="/signin" element={<Signin onSignin={setUser} resetState={resetFunction} />} />}
                <Route path="/signup" element={<Signup onSignup={setUser} />} />
                {user && (
                    <>
                        <Route path="/updateProfile" element={<UpdateUserProfile user={user} setUser={setUser} />} />
                        <Route path="/:id/history" element={<History />} />
                        <Route path="/:id/achievements" element={<Achievements user={user} fetchAchievements={fetchAchievements} />} />
                    </>
                )}
            </Routes>
            <Footer user={user} onRandomize={randomizerFunction} />
        </div>
    );
}

export default App;