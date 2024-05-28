import React from "react";
import Conclusion from "./Conclusion";
import conclusionsData from "../data";

const colorMapping = {
    conclusion1: "bg-blue-500",
    conclusion2: "bg-purple-500",
    conclusion3: "bg-green-500",
    conclusion4: "bg-green-500",
    conclusion5: "bg-blue-500",
    conclusion6: "bg-purple-500",
    conclusion7: "bg-blue-500",
    conclusion8: "bg-green-500",
    conclusion9: "bg-purple-500",
    conclusion10: "bg-blue-500",
    conclusion11: "bg-green-500",
    conclusion12: "bg-purple-500",
  };
  

const Conclusions = ({ conclusions = conclusionsData }) => {
  console.log(conclusions);

  return (
    // Add padding around the content
    <div className="p-4">
      {/*  Center the text horizontally, then add bottom margin to containter;  */}
      <div className="text-center mb-4">
        <h2 className="text-xl">Jump</h2>
        <h2 className="text-xl">to</h2>
        <h2 className="text-xl">Conclusions</h2>
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
