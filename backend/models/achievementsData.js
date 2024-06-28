import fajita from './assets/fajita.svg';
import cake from './assets/cake.svg';
import coffee_mug from './assets/coffee-mug.svg';
import movie_night from './assets/movie-night.svg';
import printer_2 from './assets/printer-2.svg';
import alarm_clock from './assets/alarm-clock.svg';
import atm from './assets/atm.svg';
import baseball_bat from './assets/baseball-bat.svg';
import fishing from './assets/fishing.svg';
import beer from './assets/beer.svg';
import gaming from './assets/gaming.svg';
import trophy_first from './assets/trophy-first.svg';

const achievementsData = [
    { name: 'conclusion1', answer: '???', displayName: 'Extreme Fajita', image: fajita, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion2', answer: 'JUMP AGAIN', displayName: "Boss's Birthday", image: cake, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion3', answer: 'STRIKE OUT', displayName: 'Hot Coffee', image: coffee_mug, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion4', answer: 'COULD BE', displayName: 'Movie Night', image: movie_night, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion5', answer: 'LOOSE ONE TURN', displayName: 'PC Load Letter', image: printer_2, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion6', answer: 'YES!', displayName: 'Snooze Button', image: alarm_clock, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion7', answer: 'No!', displayName: 'Secret ATM', image: atm, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion8', answer: 'Accept It', displayName: 'Baseball Bat', image: baseball_bat, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion9', answer: 'GO WILD', displayName: 'Fishing Trip', image: fishing, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion10', answer: 'ONE STEP BACK', displayName: 'Beer with Friends', image: beer, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion11', answer: 'THINK AGAIN', displayName: 'Gaming at Work', image: gaming, isUnlocked: false, requiredLandings: 3 },
    { name: 'conclusion12', answer: 'MOOT!', displayName: 'Weekend Warrior', image: trophy_first, isUnlocked: false, requiredLandings: 3 },
];

module.exports = achievementsData;


export default achievementsData;
