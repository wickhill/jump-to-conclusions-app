import React from 'react';
import conclusions from '../data';
import Conclusions from '../components/Conclusions';

const Home = () => {
    return (
    <div id="root" className="p-8 text-center">
        <Conclusions conclusions={conclusions} />
    </div>
    );
};

export default Home;
