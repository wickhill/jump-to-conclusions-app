import React from "react";
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

const Conclusions = ({ conclusions = conclusionsData }) => {
    console.log(conclusions);

    return (
        // Add padding around the content
        <div className="p-4">
        {/*  Center the text horizontally, then add bottom margin to container;  */}
        <div className="jump-to-text text-center mb-4">
            <h2 className="text-4xl jersey-15-regular">Jump!</h2>
            <h2 className="text-3xl jersey-15-regular">to</h2>
            <h2 className="text-4xl jersey-15-regular">Conclusions!</h2>
        </div>

        {/* Apply grid layout; we define a 3-column grid, then add a gap (4) between grid items */}
        <div className="grid grid-cols-3 gap-4">
            {Object.keys(conclusions).map((key, index) => {
            const conclusion = conclusions[key];
            const colorClass = colorMapping[key];
            return <Conclusion key={index} conclusion={conclusion} colorClass={colorClass} />;
            })}
        </div>
        </div>
    );
};

export default Conclusions;
