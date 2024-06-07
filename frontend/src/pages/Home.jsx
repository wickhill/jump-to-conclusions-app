import React, { useEffect, useContext } from 'react';
import Conclusions from '../components/Conclusions';
import { UserContext } from '../UserContext';
import achievementsData from '../achievementsData';

const Home = ({ fetchAchievements }) => {
    const { user, setRandomizerFunction } = useContext(UserContext);

    useEffect(() => {
        console.log("Home component mounted by user:", user);
        setRandomizerFunction(() => {
            return () => {
                console.log("Randomizer logic executed for user:", user);
            };
        });

        achievementsData.forEach(achievement => {
            console.log(`conclusion: ${achievement.name} and cheeve: ${achievement.displayName} unlocked by user: ${JSON.stringify(user)}`);
        });
    }, [setRandomizerFunction, user]);

    return (
        <div id="content" className="p-1 text-center">
            <Conclusions fetchAchievements={fetchAchievements} />
        </div>
    );
};

export default Home;
