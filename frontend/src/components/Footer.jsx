import React, { useContext } from 'react';
import footprintSvg from '../assets/footprint.svg';
import { UserContext } from '../UserContext';

const Footer = () => {
    const { user, randomizerFunction } = useContext(UserContext);

    console.log("Footer received user:", user);  // debugging
    console.log("Footer received randomizerFunction:", randomizerFunction);  // debugging

    // const handleClick = () => {
    //     if (typeof randomizerFunction === 'function') {
    //         randomizerFunction();
    //     } else {
    //         console.error('randomizerFunction is not a function');
    //     }
    // };

    return (
        <footer className="footer">
            {/* <button className="footprint-button" onClick={handleClick}>
                <img src={footprintSvg} alt="Footprint" className="footprint-icon" />
            </button> */}
        </footer>
    );
};

export default Footer;
