import React from 'react';
import footprintSvg from '../assets/footprint.svg';

const FootprintButton = ({ onClick }) => {
    return (
        <button className="footprint-button" onClick={onClick}>
            <img src={footprintSvg} alt="Footprint" className="footprint-icon" />
        </button>
    );
};

const Footer = ({ onRandomize }) => {
    return (
        <footer className="footer">
            <FootprintButton onClick={onRandomize} />
        </footer>
    );
};

export default Footer;
