import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { UserContext } from '../UserContext';
import joanna from '../assets/joanna-office-space.jpg';
import lawrence from '../assets/lawrence-office-space-sq.jpg';
import michael_bolton from '../assets/michael-bolton-sq.jpg';
import printer_office_space from '../assets/printer-office-space-sq.jpg';
import the_bobs_sq from '../assets/the-bobs-sq.jpg';
import printerSVG from '../assets/printer.svg';
import stapler from '../assets/red-stapler.svg';
import TPSreport from '../assets/tps-report.svg';
import Logout from './Logout';

const Navbar = () => {
  const { user, onLogout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  let imgSrc;
  let imgAlt;

  switch (location.pathname) {
    case '/':
      imgSrc = the_bobs_sq;
      imgAlt = 'Home';
      break;
    case '/signup':
      imgSrc = joanna;
      imgAlt = 'Sign Up';
      break;
    case '/signin':
      imgSrc = michael_bolton;
      imgAlt = 'Sign In';
      break;
    case '/updateProfile':
      imgSrc = lawrence;
      imgAlt = 'Update Profile';
      break;
    default:
      imgSrc = printerSVG;
      imgAlt = 'Home';
  }

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-300 shadow z-50">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="flex flex-col items-center">
          <img src={imgSrc} className="h-12" alt="Bob" />
          <span className="text-sm font-semibold text-gray-800">Home</span>
        </Link>
        <div className="flex flex-col items-center">
          {user ? (
            <Link to={`/${user._id}/achievements`} className="h-16">
              <img src={stapler} className="h-16 -mt-3" />
              <span className="text-center text-xs text-gray-900">Cheeves!</span>
            </Link>
          ) : (
            <div className="flex flex-col items-center">
              <img src={stapler} className="h-16" />
              <span className="text-center text-xs text-gray-900">Cheeves! <br />(sign in to view)</span>
            </div>
          )}
        </div>
        {user && (
          <Link to={`/${user._id}/history`} className="flex flex-col items-center">
            <img src={TPSreport} className="h-16" />
            <span className="text-center text-xs text-gray-900 mt-1">History</span>
          </Link>
        )}
        <div className="flex items-center space-x-3 h-10">
          {user ? (
            <div className="relative">
              <button onClick={handleToggleDropdown} type="button" className="text-sm rounded-full focus:ring-4 focus:ring-gray-300">
                <CgProfile className="text-gray-100 h-8 w-8" />
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-white ring-opacity-5">
                  <div>
                    <Link to="/updateProfile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Logout onLogout={onLogout}/>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signup" className="text-gray-900 font-bold bg-teal-400 hover:bg-teal-700 px-4 py-2 rounded">
                Sign Up
              </Link>
              <Link to="/signin" className="text-gray-900 font-bold bg-teal-400 hover:bg-teal-700 px-4 py-2 rounded">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
