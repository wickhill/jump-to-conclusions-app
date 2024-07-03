import React from "react";
import Achievement from "./Achievement";
import '../App.css';

const Achievements = ({ unlockedAchievements }) => {
    const unlockedCount = unlockedAchievements.filter(achievement => achievement.isUnlocked).length;

    return (
        <div id="content" className="p-1 text-center">
            <span className="achievements-text text-l jersey-15-regular mt-16 mb-1"><h1>Cheeves! </h1></span>
            <span className="achievements-text text-xs -mt-2">(achievements)</span>
            <div className="p-4 grid grid-cols-3 gap-4 mb-3">
                {unlockedAchievements.map((achievement, index) => (
                    <div key={index}>
                        <Achievement achievement={achievement} isUnlocked={achievement.isUnlocked} />
                    </div>
                ))}
            </div>
            <span className="p-1 achievements-text text-xs jersey-15-regular -mb-8">
                <h1>{unlockedCount}/12 Unlocked</h1>
            </span>
        </div>
    );
};

export default Achievements;
