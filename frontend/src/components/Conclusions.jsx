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

const Conclusions = ({ conclusions = conclusionsData, onRandomize }) => {
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
        }, 2300); // Cycle for 2.3 seconds
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

            <style jsx>{`
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
