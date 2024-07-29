import images from './assets/imageImports'; // Import the images

const backendUrl = import.meta.env.VITE_APP_CLIENT_BACKEND_URL;

// Global State Management consolidate scope, state sharing, component issues
import React, { createContext, useState, useEffect } from 'react';

// UserContext creates context for managing `user` state
// defines a context as means to pass data through component tree w/out having to pass props down manually at every level
export const UserContext = createContext();

// component to wrap parts of app that need access to user state
// holds the state and functions for global availability and provides them to all components within its tree.
export const UserProvider = ({ children }) => {
    // initialize `user` state with data from localStorage
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        return storedUser ? { ...storedUser, token } : null;
    });

    // state for storing randomizer function
    const [randomizerFunction, setRandomizerFunction] = useState(null);

    // state for unlocked achievements
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    // state for achievements data
    const [achievementsData, setAchievementsData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false); // new state to track if data has been fetched

    // effect to load `user` state from localStorage when component mounts
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser) {
            setUser({ ...JSON.parse(storedUser), token });
        }
    }, []);

    // effect to update localStorage when `user` state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            if (user.token) {
                localStorage.setItem('token', user.token);
            }
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [user]);

    // function to fetch achievements data
    const fetchAchievementsData = async () => {
        if (dataFetched) return; // prevent multiple fetches
    
        try {
            const response = await fetch(`${backendUrl}/user/achievementsData`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                const achievementsWithImages = data.map(achievement => ({
                    ...achievement,
                    image: images[achievement.image.replace('.svg', '')] // Use the images object
                }));
                setAchievementsData(achievementsWithImages);
                setDataFetched(true); // set dataFetched to true after successful fetch
            } else {
                console.error('Achievements data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching achievements data:', error);
        }
    };
    
    useEffect(() => {
        fetchAchievementsData();
    }, []);
    

    // function to handle `user` logout
    const onLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // provide `user` state and functions to component tree
    return (
        <UserContext.Provider value={{
            user, setUser, randomizerFunction, setRandomizerFunction,
            onLogout, unlockedAchievements, setUnlockedAchievements, achievementsData, fetchAchievementsData
        }}>
            {children}
        </UserContext.Provider>
        // `UserContext` is a component provided by the context API that makes the context value available to all its child components
        // it provides the state and functions defined in `UserProvider` to any component within the tree that consumes the context
    );
};
