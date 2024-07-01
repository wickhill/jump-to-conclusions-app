import React from "react";
import '../App.css';

const Achievement = ({ achievement, isUnlocked }) => {
    return (
        <div className={`flex flex-col items-center ${isUnlocked ? 'opacity-100' : 'opacity-30'}`}>
            <img src={achievementsData.image} className="h-16" />
            <span className="text-center text-xs text-gray-900">
                {achievementsData.displayName} <br /> {!isUnlocked && "(hasn't been unlocked)"}
            </span>
        </div>
    );
};

export default Achievement;