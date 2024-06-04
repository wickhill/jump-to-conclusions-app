import React from 'react';
import conclusions from '../conclusionsData';
import Conclusions from '../components/Conclusions';

const Home = ({ setRandomizerFunction, fetchAchievements }) => {
    return (
        <div id="content" className="p-1 text-center">
            <Conclusions onRandomize={setRandomizerFunction} fetchAchievements={fetchAchievements} />
        </div>
    );
};

export default Home;
