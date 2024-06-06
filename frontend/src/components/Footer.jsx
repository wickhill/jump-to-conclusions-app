import React from 'react';
import footprintSvg from '../assets/footprint.svg';

const FootprintButton = ({ onClick, user }) => {
    return (
        <button className="footprint-button" onClick={() => {
            console.log('FootprintButton clicked by user:', user); // debugging
            console.log('onClick:', onClick); // debugging
            if (typeof onClick === 'function') {
                onClick(user);
            } else {
                console.error('onClick is not a function');
            }
        }}>
            <img src={footprintSvg} alt="Footprint" className="footprint-icon" />
        </button>
    );
};

const Footer = ({ user, onRandomize }) => {
    console.log('Footer received onRandomize:', onRandomize); // debugging
    console.log('Footer received user:', user); // debugging
    return (
        <footer className="footer">
            <FootprintButton onClick={onRandomize} user={user} />
        </footer>
    );
};

export default Footer;
