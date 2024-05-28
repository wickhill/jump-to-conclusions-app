import React from "react";

const Conclusion = ({ conclusion, colorClass }) => {
  return (
    // Setting bg as light gray temporarily; round corners; add medium shadow for depth
    <div className={`p-4 ${colorClass} text-green rounded-md shadow-md`}>
      <h2 className="text-center">{conclusion.answer}</h2>
    </div>
  );
};

export default Conclusion;
