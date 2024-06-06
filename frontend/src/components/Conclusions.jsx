import React, { useState, useEffect } from "react";
import conclusionsData from "../conclusionsData"; // the correct path to conclusionsData.js
import colorMapping from "../colorMapping"; // the correct path to colorMapping.js
import Conclusion from "./Conclusion"; // the correct path to Conclusion.jsx
import '../App.css';

const Conclusions = ({ user, fetchAchievements, onRandomize, setResetFunction }) => {
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
        console.log("startRandomizer called by user:", user); // debugging
        const currentUser = user;
        setRandomIndex(null);
        setHighlightedIndex(5); // initial conclusion highlight index ALTER FOR onRandomizer DEBUGGING
        setTimeout(() => {
            const finalRandomIndex = Math.floor(Math.random() * Object.keys(conclusionsData).length);
            setRandomIndex(finalRandomIndex);
            console.log('The user:', currentUser, 'landed on conclusion:', finalRandomIndex + 1);
            setHighlightedIndex(null);

            if (user) {
                console.log(`The user Jumping to Conclusions is: ${user._id} Message 1`); // debugging

                const conclusionId = Object.keys(conclusionsData)[finalRandomIndex];
                console.log(`Sending POST request with conclusionId: ${conclusionId}`); // debugging
                updateUserConclusion(user._id, conclusionId);
            } else {
                console.error("User is not defined");
            }
        }, 2300);
    };

    const updateUserConclusion = async (userId, conclusionId) => {
        try {
            console.log('Sending POST request to:', `http://localhost:3000/user/${userId}/conclusion`); // debugging
            console.log('Request body:', { conclusionId }); // debugging
            const response = await fetch(`http://localhost:3000/user/${userId}/conclusion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ conclusionId }),
            });
            if (!response.ok) {
                throw new Error('Failed to update conclusion');
            }
            console.log('POST request sent successfully', response); // debugging
            console.log('User has been updated', user); // debugging
        } catch (error) {
            console.error("Error updating conclusion:", error);
            setError('Failed to update conclusion. Please try again.');
        }
    };
    

    useEffect(() => {
        if (onRandomize) {
            onRandomize(() => startRandomizer);
        }
    }, [onRandomize, user]); // Add user to the dependency array

    useEffect(() => {
        if (!user) {
            setHighlightedIndex(null);
            setRandomIndex(null);
            setError(null);
        }
    }, [user]); // Reset state when user changes

    useEffect(() => {
        setResetFunction(() => () => {
            setHighlightedIndex(null);
            setRandomIndex(null);
            setError(null);
        });
    }, [setResetFunction]);

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
