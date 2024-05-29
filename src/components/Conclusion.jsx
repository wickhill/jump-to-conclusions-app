import React, { useEffect, useRef } from "react";
import { resizeText } from "../utils/utils";

const Conclusion = ({ conclusion, colorClass }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      resizeText(textRef.current, 8, 20); // Adjust min and max font size as needed
    }
  }, [conclusion]);

  return (
    <div className={`p-1 ${colorClass} text-black rounded-md shadow-md flex items-center justify-center h-20 w-30`}>
      <h2 ref={textRef} className="text-center dynamic-text w-full h-full">
        {conclusion.answer}
      </h2>
    </div>
  );
};

export default Conclusion;
