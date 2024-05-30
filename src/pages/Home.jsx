import React from 'react';
import conclusions from '../data';
import Conclusions from '../components/Conclusions';

const Home = ({ setRandomizerFunction }) => {
    return (
    <div id="root" className="p-7 text-center">
        <Conclusions onRandomize={setRandomizerFunction} />
    </div>
    );
};

export default Home;
