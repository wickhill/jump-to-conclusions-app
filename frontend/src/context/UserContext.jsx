import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [randomizerFunction, setRandomizerFunction] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser, randomizerFunction, setRandomizerFunction }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
