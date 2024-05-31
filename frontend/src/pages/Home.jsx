import React from 'react';
import conclusions from '../data';
import Conclusions from '../components/Conclusions';

const Home = ({ setRandomizerFunction }) => {
    return (
        <div id="content" className="p-1 text-center">
            <Conclusions onRandomize={setRandomizerFunction} />
        </div>
    );
};

export default Home;
