import React, { useEffect, useContext } from 'react';
import Conclusions from '../components/Conclusions';
import { UserContext } from '../UserContext';

const Home = ({ fetchAchievements, unlockedAchievements, achievementsData }) => {
    const { user, setRandomizerFunction } = useContext(UserContext);

    useEffect(() => {
        // console.log("Home component mounted by user:", user);
        setRandomizerFunction(() => {
            return () => {
                // console.log("Randomizer logic in Home component received by user:", user);
            };
        });
    }, [setRandomizerFunction, user]);

    return (
        <div id="content" className="p-1 text-center">
            <Conclusions fetchAchievements={fetchAchievements} unlockedAchievements={unlockedAchievements} achievementsData={achievementsData} />
        </div>
    );
};

export default Home;
