import React, { useState, useEffect } from "react";
import Conclusion from "./Conclusion";
import conclusionsData from "../data";
import '../App.css';

const colorMapping = {
    conclusion1: "bg-blue-500 hover:bg-blue-300",
    conclusion2: "bg-purple-500 hover:bg-purple-300",
    conclusion3: "bg-green-500 hover:bg-green-300",
    conclusion4: "bg-green-500 hover:bg-green-300",
    conclusion5: "bg-blue-500 hover:bg-blue-300",
    conclusion6: "bg-purple-500 hover:bg-purple-300",
    conclusion7: "bg-blue-500 hover:bg-blue-300",
    conclusion8: "bg-green-500 hover:bg-green-300",
    conclusion9: "bg-purple-500 hover:bg-purple-300",
    conclusion10: "bg-blue-500 hover:bg-blue-300",
    conclusion11: "bg-green-500 hover:bg-green-300",
    conclusion12: "bg-purple-500 hover:bg-purple-300",
};

const Conclusions = ({ conclusions = conclusionsData, onRandomize, user }) => {
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [randomIndex, setRandomIndex] = useState(null);

    useEffect(() => {
        let interval;
        if (highlightedIndex !== null) {
            interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * Object.keys(conclusions).length);
                setHighlightedIndex(randomIndex);
            }, 200); // Change highlight every 200ms
        }
        return () => clearInterval(interval);
    }, [highlightedIndex, conclusions]);

    const startRandomizer = () => {
        setRandomIndex(null); // Reset the randomIndex to clear previous selection
        setHighlightedIndex(0);
        setTimeout(() => {
            const finalRandomIndex = Math.floor(Math.random() * Object.keys(conclusions).length);
            setRandomIndex(finalRandomIndex);
            setHighlightedIndex(null);

            // Send the conclusion landing to the backend
            if (user) {
                const conclusionId = Object.keys(conclusions)[finalRandomIndex];
                console.log(`Sending POST request with conclusionId: ${conclusionId}`);
                updateUserConclusion(user._id, conclusionId);
            }
        }, 2300); // Cycle for 2.3 seconds
    };

    const updateUserConclusion = async (userId, conclusionId) => {
        try {
            console.log('Sending POST request to:', `/user/${userId}/conclusion`);
            console.log('Request body:', JSON.stringify({ conclusionId }));
            const response = await fetch(`/user/${userId}/conclusion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token
                },
                body: JSON.stringify({ conclusionId }),
            });
            const data = await response.json();
            console.log('POST request sent successfully:', response);
            console.log('Response data:', data);
        } catch (error) {
            console.error("Error updating conclusion:", error);
        }
    };

    // Make startRandomizer available to the parent component
    useEffect(() => {
        if (onRandomize) {
            onRandomize(() => startRandomizer); // Pass function instead of invoking it
        }
    }, [onRandomize]);

    return (
        <div className="p-1">
            <div className="jump-to-text text-center mb-5">
                <h2 className="text-4xl jersey-15-regular mb-2">Jump!</h2>
                <h2 className="text-3xl jersey-15-regular mb-2">to</h2>
                <h2 className="text-4xl jersey-15-regular mb-2">Conclusions!</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {Object.keys(conclusions).map((key, index) => {
                    const conclusion = conclusions[key];
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
