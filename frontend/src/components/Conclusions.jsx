import React, { useState, useEffect, useContext, useCallback } from "react";
import colorMapping from "../colorMapping"; // For local deployment, otherwise app breaks
// import colorMapping from "../colormapping"; // For Netlify deployment, otherwise app breaks
import Conclusion from "./Conclusion";
import { UserContext } from '../UserContext';
import footprintSvg from '../assets/footprint.svg';
import '../App.css';
const backendUrl = import.meta.env.VITE_APP_CLIENT_BACKEND_URL;

const Conclusions = ({ fetchAchievements, unlockedAchievements, achievementsData }) => {
    const { user, setRandomizerFunction } = useContext(UserContext);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [randomIndex, setRandomIndex] = useState(null);
    const [error, setError] = useState(null);
    const [inputText, setInputText] = useState("");

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };
    


    useEffect(() => {
        let interval;
        if (highlightedIndex !== null && Array.isArray(achievementsData)) {
            interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * achievementsData.length);
                setHighlightedIndex(randomIndex);
            }, 200);
        }
        return () => clearInterval(interval);
    }, [highlightedIndex, achievementsData]);

    const startRandomizer = useCallback(() => {
        setRandomIndex(null);
        setHighlightedIndex(5);
        setTimeout(() => {
            if (Array.isArray(achievementsData)) {
                const finalRandomIndex = Math.floor(Math.random() * achievementsData.length);
                setRandomIndex(finalRandomIndex);
                setHighlightedIndex(null);

                if (user) {
                    const conclusionId = achievementsData[finalRandomIndex].name;
                    console.log(`The user Jumping to Conclusions is: ${user._id}`);
                    console.log(`Sending POST request with conclusionId: ${conclusionId}`);
                    updateUserConclusion(user._id, conclusionId, inputText);
                } else {
                    console.error("User is not defined");
                }
            } else {
                console.error("Achievements data is not an array");
            }
        }, 2300);
    }, [user, achievementsData, inputText]);

    const updateUserConclusion = async (userId, conclusionId, inputText = "No Question") => {
        try {
            const token = localStorage.getItem('token'); // Ensure token is retrieved correctly
            if (!token) {
                throw new Error('Token not found');
            }
            const response = await fetch(`${backendUrl}/user/${userId}/conclusion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ conclusionId, inputText }),
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
                {Array.isArray(achievementsData) && achievementsData.map((conclusion, index) => {
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

                <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter your question"
            className="text-input"
        />

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
