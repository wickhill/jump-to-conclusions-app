import React from 'react';
import footprintSvg from '../assets/footprint.svg';

const FootprintButton = ({ onClick, user }) => {
    return (
        <button className="footprint-button" onClick={() => {
            console.log('FootprintButton clicked by user:', user);
            console.log('onClick:', onClick);
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
    console.log('Footer received onRandomize:', onRandomize);
    console.log('Footer received user:', user);
    return (
        <footer className="footer">
            <FootprintButton onClick={onRandomize} user={user} />
        </footer>
    );
};

export default Footer;
