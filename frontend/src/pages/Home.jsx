import React, { useEffect, useContext } from 'react';
import Conclusions from '../components/Conclusions';
import Achievements from './Achievements';
import { UserContext } from '../UserContext';
// import achievementsData from '../achievementsData';

const Home = () => {
    const { user, setRandomizerFunction } = useContext(UserContext);

    // fetch achievements logic:
    const fetchAchievements = async () => {
        // console.log("fetchAchievements called by user:", user);
        // achievementsData.forEach(achievement => {
        //     console.log(`conclusion: ${achievement.name} and cheeve: ${achievement.displayName} unlocked by user: ${JSON.stringify(user)}`);
        // });
    };

    useEffect(() => {
        console.log("Home component mounted by user:", user);
        setRandomizerFunction(() => {
            return () => {
                console.log("Randomizer logic executed for user:", user);
            };
        });
    }, [setRandomizerFunction, user]);

    return (
        <div id="content" className="p-1 text-center">
            <Conclusions fetchAchievements={fetchAchievements} />
            {/* <Achievements user={user} fetchAchievements={fetchAchievements} /> */}
        </div>
    );
};

export default Home;
