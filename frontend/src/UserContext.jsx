import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        return storedUser ? { ...storedUser, token } : null;
    });
    const [randomizerFunction, setRandomizerFunction] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser) {
            setUser({ ...JSON.parse(storedUser), token });
        }
    }, []);

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

    const onLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, setUser, randomizerFunction, setRandomizerFunction, onLogout }}>
            {children}
        </UserContext.Provider>
    );
};
