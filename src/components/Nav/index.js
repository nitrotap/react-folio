import React from 'react';

function Nav({ currentLink, handlePageChange, setCurrentLink }) {

    return (
        <header>
            <ul className="nav nav-tabs">
                <li className="nav-mobile">
                    <a
                        href="#About"
                        onClick={() => handlePageChange('About')}
                        id="about"
                        className={currentLink === 'About' ? 'nav-link active' : 'nav-link'}
                    >
                        About
                    </a>
                </li>
                <li className="nav-mobile">
                    <a
                        href="#Portfolio"
                        onClick={() => handlePageChange('Portfolio')}
                        className={currentLink === 'Portfolio' ? 'nav-link active' : 'nav-link'}
                    >
                        Portfolio
                    </a>
                </li>
                <li className="nav-mobile">
                    <a
                        href="#Resume"
                        onClick={() => handlePageChange('Resume')}

                        className={currentLink === 'Resume' ? 'nav-link active' : 'nav-link'}
                    >
                        Resume
                    </a>
                </li>
                <li className="nav-mobile">
                    <a
                        href="#Contact"

                        onClick={() => handlePageChange('Contact')}
                        className={currentLink === 'Contact' ? 'nav-link active' : 'nav-link'}
                    >
                        Contact
                    </a>
                </li>
            </ul>
            <div className="right">
                <h3 className="white-text animate__animated animate__bounce">nitrotap</h3>
            </div>
        </header >
    );
}

export default Nav;
