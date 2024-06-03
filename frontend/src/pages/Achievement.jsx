import React from 'react';

const Achievement = ({ name, image, isUnlocked }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={image} className={`h-16 ${!isUnlocked && 'opacity-30'}`} alt={name} />
      <span className="text-center text-xs text-gray-900">
        {name} <br /> {!isUnlocked && "(hasn't been unlocked)"}
      </span>
    </div>
  );
};

export default Achievement;
