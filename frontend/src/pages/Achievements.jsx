import React, { useEffect, useState } from "react";
import Achievement from "./Achievement";
import '../App.css';

import trophy_first from '../assets/trophy-first.svg';
import alarm_clock from '../assets/alarm-clock.svg';
import atm from '../assets/atm.svg';
import baseball_bat from '../assets/baseball-bat.svg';
import beer from '../assets/beer.svg';
import cake from '../assets/cake.svg';
import fajita from '../assets/fajita.svg';
import fishing from '../assets/fishing.svg';
import gaming from '../assets/gaming.svg';
import movie_night from '../assets/movie-night.svg';
import printer_2 from '../assets/printer-2.svg';
import coffee_mug from '../assets/coffee-mug.svg';

const achievementsData = [
    { name: 'Extreme Fajita', image: fajita, isUnlocked: false },
    { name: "Boss's Birthday", image: cake, isUnlocked: false },
    { name: 'Hot Coffee', image: coffee_mug, isUnlocked: false },
    { name: 'Movie Night', image: movie_night, isUnlocked: false },
    { name: 'PC Load Letter', image: printer_2, isUnlocked: false },
    { name: 'Snooze Button', image: alarm_clock, isUnlocked: false },
    { name: 'Secret ATM', image: atm, isUnlocked: false },
    { name: 'Baseball Bat', image: baseball_bat, isUnlocked: false },
    { name: 'Fishing Trip', image: fishing, isUnlocked: false },
    { name: 'Beer with Friends', image: beer, isUnlocked: false },
    { name: 'Gaming at Work', image: gaming, isUnlocked: false },
    { name: 'Weekend Warrior', image: trophy_first, isUnlocked: false },
];

const Achievements = ({ user }) => {
    const [achievements, setAchievements] = useState(achievementsData);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                if (user && user._id) {
                    const url = `http://localhost:3000/user/${user._id}/achievements`;
                    console.log('Fetching URL:', url);
                    const response = await fetch(url, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    console.log('Response:', response);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log('Fetched data:', data);

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

        fetchAchievements();
    }, [user]);

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
