import React from 'react';
import Conclusions from '../components/Conclusions'; // Ensure the path is correct

const Home = ({ setRandomizerFunction }) => {
  return (
    <div>
      <h1>Welcome to Jump to Conclusions!</h1>
      <Conclusions onRandomize={setRandomizerFunction} />
    </div>
  );
};

export default Home;
