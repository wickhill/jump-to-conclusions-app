import React, { useEffect, useState } from "react";
import Achievement from "./Achievement";
import '../App.css';
// import achievementsData from '../achievementsData';
// import image from "../image";

import fajita from '../assets/fajita.svg';
import cake from '../assets/cake.svg';
import coffee_mug from '../assets/coffee-mug.svg';
import movie_night from '../assets/movie-night.svg';
import printer_2 from '../assets/printer-2.svg';
import alarm_clock from '../assets/alarm-clock.svg';
import atm from '../assets/atm.svg';
import baseball_bat from '../assets/baseball-bat.svg';
import fishing from '../assets/fishing.svg';
import beer from '../assets/beer.svg';
import gaming from '../assets/gaming.svg';
import trophy_first from '../assets/trophy-first.svg';

const achievementsData = [
    { name: 'conclusion1', displayName: 'Extreme Fajita', image: fajita, isUnlocked: false },
    { name: 'conclusion2', displayName: "Boss's Birthday", image: cake, isUnlocked: false },
    { name: 'conclusion3', displayName: 'Hot Coffee', image: coffee_mug, isUnlocked: false },
    { name: 'conclusion4', displayName: 'Movie Night', image: movie_night, isUnlocked: false },
    { name: 'conclusion5', displayName: 'PC Load Letter', image: printer_2, isUnlocked: false },
    { name: 'conclusion6', displayName: 'Snooze Button', image: alarm_clock, isUnlocked: false },
    { name: 'conclusion7', displayName: 'Secret ATM', image: atm, isUnlocked: false },
    { name: 'conclusion8', displayName: 'Baseball Bat', image: baseball_bat, isUnlocked: false },
    { name: 'conclusion9', displayName: 'Fishing Trip', image: fishing, isUnlocked: false },
    { name: 'conclusion10', displayName: 'Beer with Friends', image: beer, isUnlocked: false },
    { name: 'conclusion11', displayName: 'Gaming at Work', image: gaming, isUnlocked: false },
    { name: 'conclusion12', displayName: 'Weekend Warrior', image: trophy_first, isUnlocked: false },
];

const Achievements = ({ user }) => {
    const [achievements, setAchievements] = useState(achievementsData);
    console.log(`The user Jumping to Conclusions is: ${user._id} Message 1`)
    // console.log(`The user Jumping to Conclusions is: ${userId} Message 2`)
    console.log(`The user Jumping to Conclusions is: ${user} Message 3`)

    const fetchAchievements = async () => {
        try {
            if (user && user._id) {
                const url = `http://localhost:3000/user/${user._id}/achievements`;
                console.log('Fetching URL:', url);

                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }
                console.log('Token:', token);

                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
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
                console.log('Achievements Map:', achievementsMap);

                const updatedAchievements = achievementsData.map(achievement => ({
                    ...achievement,
                    isUnlocked: achievementsMap.get(achievement.name) || false
                }));
                console.log('Updated Achievements:', updatedAchievements);
                setAchievements(updatedAchievements);
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    };

    useEffect(() => {
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