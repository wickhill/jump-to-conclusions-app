import React from 'react';
import footprintSvg from '../assets/footprint.svg';

const FootprintButton = () => {
    return (
    <button className="footprint-button">
    <img src={footprintSvg} alt="Footprint" className="footprint-icon" />
    </button>
    );
};

const Footer = () => {
    return (
    <footer className="footer">
    <FootprintButton />
    </footer>
    );
};

export default Footer;