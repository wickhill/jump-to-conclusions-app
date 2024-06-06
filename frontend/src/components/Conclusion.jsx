import React, { useEffect, useRef } from "react";
import { resizeText } from "../utils/utils";
import '../App.css';

const Conclusion = ({ conclusion, colorClass }) => {
  const textRef = useRef(null);
  const divRef = useRef(null); // ref, add + rm CSS classes

  useEffect(() => {
    if (textRef.current) {
      resizeText(textRef.current, 8, 20);
    }
  }, [conclusion]);

  // Hover effect plus timing parameter
  const handleHover = () => {
    if (divRef.current) {
      divRef.current.classList.add('hover');
      setTimeout(() => {
        divRef.current.classList.remove('hover');
      }, 300);
    }
  };

  return (
    <div
      ref={divRef}
      className={`p-1 ${colorClass} text-black rounded-md shadow-md flex items-center justify-center h-20 w-30 hover-trigger`}
      onTouchStart={handleHover}
    >
      <h2 ref={textRef} className="text-center dynamic-text w-full h-full">
        {conclusion.answer}
      </h2>
    </div>
  );
};

export default Conclusion;