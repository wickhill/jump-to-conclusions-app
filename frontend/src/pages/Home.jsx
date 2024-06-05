import React, { useEffect } from 'react';
import Conclusions from '../components/Conclusions';

const Home = ({ setRandomizerFunction, fetchAchievements, user, setResetFunction }) => {
    useEffect(() => {
        console.log("Home component mounted by user:", user);
        setRandomizerFunction(() => {
            console.log("Randomizer function invoked by user:", user);
            // Return the function to be called
            return () => {
                console.log("Randomizer logic executed for user:", user);
                // Call the randomizer logic here
            };
        });
    }, [setRandomizerFunction, user]);

    return (
        <div id="content" className="p-1 text-center">
            <Conclusions user={user} fetchAchievements={fetchAchievements} onRandomize={setRandomizerFunction} setResetFunction={setResetFunction} />
        </div>
    );
};

export default Home;
