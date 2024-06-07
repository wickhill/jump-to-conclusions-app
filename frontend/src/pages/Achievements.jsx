import React, { useEffect, useState } from "react";
import Achievement from "./Achievement";
import '../App.css';
import achievementsData from "../achievementsData";


const Achievements = ({ user, fetchAchievements }) => {
    const [achievements, setAchievements] = useState(achievementsData);
    
    useEffect(() => {
        console.log('Achievements.jsx received user:', user); // debugging
        fetchAchievementsData();
    }, [user]);

    const fetchAchievementsData = async () => {
        try {
            if (user && user._id) {
                const url = `http://localhost:3000/user/${user._id}/achievements`;

                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (!data.user || !data.user.achievements) {
                    throw new Error('Achievements data is not available in the response');
                }

                const achievementsMap = new Map(Object.entries(data.user.achievements));

                const updatedAchievements = achievementsData.map(achievement => ({
                    ...achievement,
                    isUnlocked: achievementsMap.get(achievement.name) || false
                }));
                setAchievements(updatedAchievements);
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    };

    const unlockedCount = achievements.filter(achievement => achievement.isUnlocked).length;

    return (
        <div id="content" className="p-1 text-center">
            <span className="achievements-text text-l jersey-15-regular mt-16 mb-1"><h1>Cheeves! </h1></span>
            <span className="achievements-text text-xs -mt-2">(achievements)</span>
            <div className="p-4 grid grid-cols-3 gap-4 mb-3">
                {achievements.map((achievement, index) => (
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