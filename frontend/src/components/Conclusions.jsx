import React, { useState, useEffect, useContext, useCallback } from "react";
import colorMapping from "../colorMapping"; // For local deployment, otherwise app breaks
// import colorMapping from "../colormapping"; // For Netlify deployment, otherwise app breaks
import Conclusion from "./Conclusion";
import { UserContext } from '../UserContext';
import footprintSvg from '../assets/footprint.svg';
import '../App.css';
const backendUrl = import.meta.env.VITE_APP_CLIENT_BACKEND_URL;

const Conclusions = ({ fetchAchievements }) => {
    const { user, setRandomizerFunction } = useContext(UserContext);
    const [conclusionsData, setConclusionsData] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [randomIndex, setRandomIndex] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConclusionsData = async () => {
            try {
                const response = await fetch(`${backendUrl}/achievementsData`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setConclusionsData(data);
            } catch (error) {
                console.error('Error fetching conclusions data:', error);
            }
        };

        fetchConclusionsData();
    }, []);

    useEffect(() => {
        let interval;
        if (highlightedIndex !== null) {
            interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * conclusionsData.length);
                setHighlightedIndex(randomIndex);
            }, 200);
        }
        return () => clearInterval(interval);
    }, [highlightedIndex, conclusionsData.length]);

    const startRandomizer = useCallback(() => {
        // console.log("startRandomizer called by user:", user); // Debug log
        setRandomIndex(null);
        setHighlightedIndex(5);
        setTimeout(() => {
            const finalRandomIndex = Math.floor(Math.random() * conclusionsData.length);
            setRandomIndex(finalRandomIndex);
            setHighlightedIndex(null);

            if (user) {
                const conclusionId = conclusionsData[finalRandomIndex].name;
                updateUserConclusion(user._id, conclusionId);
                console.log(`The user Jumping to Conclusions is: ${user._id}`);
                console.log(`Sending POST request with conclusionId: ${conclusionId}`);
            } else {
                console.error("User is not defined");
            }
        }, 2300);
    }, [user, conclusionsData]);

    const updateUserConclusion = async (userId, conclusionId) => {
        try {
            const response = await fetch(`${backendUrl}/user/${userId}/conclusion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ conclusionId }),
            });
            if (!response.ok) {
                throw new Error('Failed to update conclusion');
            }
            const data = await response.json();
            if (fetchAchievements) {
                fetchAchievements();
            } else {
                console.error("fetchAchievements is not defined");
            }
        } catch (error) {
            console.error("Error updating conclusion:", error);
            setError('Failed to update conclusion. Please try again.');
        }
    };

    useEffect(() => {
        // console.log("Setting randomizer function in Conclusions"); // Debug log
        setRandomizerFunction(() => startRandomizer);
    }, [setRandomizerFunction, startRandomizer]); 

    const handleClick = () => {
        if (typeof startRandomizer === 'function') {
            startRandomizer();
        } else {
            console.error('startRandomizer is not a function');
        }
    };

    return (
        <div className="p-1 flex flex-col min-h-screen">
            <div className="jump-to-text text-center mt-20 mb-1">
                <h2 className="text-4xl jersey-15-regular mt-8 mb-5" style={{ marginBottom: '-30px', marginTop: '68px' }}>Jump!</h2>
                <h2 className="text-3xl jersey-15-regular mt-8 mb-5" style={{ marginBottom: '-30px' }}>to</h2>
                <h2 className="text-4xl jersey-15-regular mt-8 mb-5" style={{ marginBottom: '25px' }}>Conclusions!</h2>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="grid grid-cols-3 gap-4">
                {conclusionsData.map((conclusion, index) => {
                    const colorClass = colorMapping[conclusion.name];
                    return (
                        <div key={index} className={`${colorClass} ${highlightedIndex === index ? 'highlighted' : ''} ${randomIndex === index ? 'selected' : ''}`}>
                            <Conclusion conclusion={conclusion} />
                        </div>
                    );
                })}
            </div>

            <div className="p-1">
                <div className="start-line-text">
                <h2 className="text-3xl jersey-15-regular mt-8 mb-5" style={{ marginBottom: '0px', marginTop: '20px' }}>---------------------------</h2>
                <h2 className="text-4xl jersey-15-regular mt-8 mb-5" style={{ marginBottom: '0px', marginTop: '0px' }}>START</h2>
                </div>
            </div>

            <footer className="footer mt-auto">
                <button className="footprint-button" onClick={handleClick}>
                    <img src={footprintSvg} alt="Footprint" className="footprint-icon" />
                </button>
            </footer>

            <style>{`
                .highlighted {
                    border: 4px solid yellow;
                }
                .selected {
                    border: 4px solid red;
                }
            `}</style>
        </div>
    );
};

export default Conclusions;
