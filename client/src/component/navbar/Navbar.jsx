import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <span className="navbar__logo-text">QuestionBank</span>
                <button className="navbar__menu-button" onClick={toggleMenu}>
                    ☰
                </button>
            </div>
            <div className={`navbar__content ${isMenuOpen ? 'active' : ''}`}>
                <ul className="navbar__links">
                    <li><Link to="/" className="navbar__link">Home</Link></li>
                    <li><Link to="/createpost" className="navbar__link">Create Post</Link></li>
                </ul>
                <div className="navbar__search">
                    <input type="text" placeholder="Search..." className="navbar__search-input" />
                    <button className="navbar__search-button">🔍</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;