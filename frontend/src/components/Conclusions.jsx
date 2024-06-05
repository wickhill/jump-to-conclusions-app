import React, { useState, useEffect } from "react";
import conclusionsData from "../conclusionsData"; // Ensure the correct path to conclusionsData.js
import colorMapping from "../colorMapping"; // Ensure the correct path to colorMapping.js
import Conclusion from "./Conclusion"; // Ensure the correct path to Conclusion.jsx
import '../App.css';

const Conclusions = ({ user, fetchAchievements, onRandomize }) => {
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [randomIndex, setRandomIndex] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let interval;
        if (highlightedIndex !== null) {
            interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * Object.keys(conclusionsData).length);
                setHighlightedIndex(randomIndex);
            }, 200);
        }
        return () => clearInterval(interval);
    }, [highlightedIndex]);

    const startRandomizer = () => {
        setRandomIndex(null);
        setHighlightedIndex(5);
        setTimeout(() => {
            const finalRandomIndex = Math.floor(Math.random() * Object.keys(conclusionsData).length);
            setRandomIndex(finalRandomIndex);
            console.log(`The user landed on ${finalRandomIndex}`)
            setHighlightedIndex(null);

            if (user) {
                const conclusionId = Object.keys(conclusionsData)[finalRandomIndex];
                console.log(`Sending POST request with conclusionId: ${conclusionId}`);
                updateUserConclusion(user._id, conclusionId);
            } else {
                console.error("User is not defined");
            }
        }, 2300);
    };

    const updateUserConclusion = async (userId, conclusionId) => {
        try {
            console.log('Sending POST request to:', `/user/${userId}/conclusion`);
            console.log('Request body:', JSON.stringify({ conclusionId }));
            const response = await fetch(`/user/${userId}/conclusion`, {
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
            console.log('POST request sent successfully:', response);
            console.log('Response data:', data);

            fetchAchievements();
        } catch (error) {
            console.error("Error updating conclusion:", error);
            setError('Failed to update conclusion. Please try again.');
        }
    };

    useEffect(() => {
        if (onRandomize) {
            onRandomize(() => startRandomizer);
        }
    }, [onRandomize]);

    return (
        <div className="p-1">
            <div className="jump-to-text text-center mb-5">
                <h2 className="text-4xl jersey-15-regular mb-2">Jump!</h2>
                <h2 className="text-3xl jersey-15-regular mb-2">to</h2>
                <h2 className="text-4xl jersey-15-regular mb-2">Conclusions!</h2>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="grid grid-cols-3 gap-4">
                {Object.keys(conclusionsData).map((key, index) => {
                    const conclusion = conclusionsData[key];
                    const colorClass = colorMapping[key];
                    return (
                        <div key={index} className={`${colorClass} ${highlightedIndex === index ? 'highlighted' : ''} ${randomIndex === index ? 'selected' : ''}`}>
                            <Conclusion conclusion={conclusion} />
                        </div>
                    );
                })}
            </div>

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
