import React from 'react';
import footprintSvg from '../assets/footprint.svg';

const FootprintButton = ({ onClick }) => {
    return (
        <button className="footprint-button" onClick={() => {
            console.log('FootprintButton clicked');
            onClick();
        }}>
            <img src={footprintSvg} alt="Footprint" className="footprint-icon" />
        </button>
    );
};

const Footer = ({ onRandomize }) => {
    console.log('Footer received onRandomize:', onRandomize);
    return (
        <footer className="footer">
            <FootprintButton onClick={onRandomize} />
        </footer>
    );
};

export default Footer;
