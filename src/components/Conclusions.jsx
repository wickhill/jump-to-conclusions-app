import React from "react";
import Conclusion from "./Conclusion";

const Conclusions = ({ conclusions }) => {
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
          return <Conclusion key={index} conclusion={conclusion} />;
        })}
      </div>
    </div>
  );
};

export default Conclusions;
