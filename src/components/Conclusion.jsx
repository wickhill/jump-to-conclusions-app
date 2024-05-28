import React, { useEffect, useRef } from "react";
import { resizeText } from "../utils/utils";

const Conclusion = ({ conclusion, colorClass }) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            resizeText(textRef.current, 8, 8);
        }
    }, [conclusion]);



  return (
    // Setting padding-4; rounded corners; medium shadow; 
    <div className={`p-4 ${colorClass} text-black rounded-md shadow-md flex items-center justify-center h-20 w-20`}>

    {/* center card text and dynamically resize depending on screen */}
      <h2 ref ={textRef}className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{conclusion.answer}</h2>
    </div>
  );
};

export default Conclusion;
