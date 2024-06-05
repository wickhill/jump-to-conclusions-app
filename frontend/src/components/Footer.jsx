import React from 'react';
import footprintSvg from '../assets/footprint.svg';
import App from '../App';

const FootprintButton = ({ user, onClick }) => {
    return (
        <button className="footprint-button" onClick={() => {
            console.log('FootprintButton clicked');
            onClick();
        }}>
            <img src={footprintSvg} alt="Footprint" className="footprint-icon" />
        </button>
    );
};

const Footer = ({ user, onRandomize }) => {
    console.log('Footer received onRandomize:', user, onRandomize);
    return (
        <footer className="footer">
            <FootprintButton onClick={onRandomize} />
        </footer>
    );
};

export default Footer;
