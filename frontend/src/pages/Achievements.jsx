import React from "react";
import Achievement from "./Achievement";
import '../App.css';

import trophy_first from '../assets/trophy-first.svg'
import leaning_tower from '../assets/leaning-tower.svg'
import alarm_clock from '../assets/alarm-clock.svg'
import atm from '../assets/atm.svg'
import baseball_bat from '../assets/baseball-bat.svg'
import beer from '../assets/beer.svg'
import cake from '../assets/cake.svg'
import fajita from '../assets/fajita.svg'
import fishing from '../assets/fishing.svg'
import gaming from '../assets/gaming.svg'
import movie_night from '../assets/movie-night.svg'
import printer_2 from '../assets/printer-2.svg'


const achievementsData = [
    { name: 'First Trophy', image: trophy_first, isUnlocked: false },
    { name: 'Leaning Tower', image: leaning_tower, isUnlocked: false },
    { name: 'Alarm Clock', image: alarm_clock, isUnlocked: false },
    { name: 'ATM', image: atm, isUnlocked: false },
    { name: 'Baseball Bat', image: baseball_bat, isUnlocked: false },
    { name: 'Beer', image: beer, isUnlocked: false },
    { name: 'Cake', image: cake, isUnlocked: false },
    { name: 'Fajita', image: fajita, isUnlocked: false },
    { name: 'Fishing', image: fishing, isUnlocked: false },
    { name: 'Gaming', image: gaming, isUnlocked: false },
    { name: 'Movie Night', image: movie_night, isUnlocked: false },
    { name: 'Printer', image: printer_2, isUnlocked: false },
  ];
  
  const Achievements = () => {
    return (
      <div id="content" className="p-1 text-center">
        <h1>Cheeves!</h1>
        <div className="grid grid-cols-3 gap-4">
          {achievementsData.map((achievement, index) => (
            <div key={index}>
              <Achievement {...achievement} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Achievements;