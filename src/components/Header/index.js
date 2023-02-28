
import React from 'react';
import Nav from '../Nav';



function Header({ currentLink, handlePageChange, setCurrentLink }) {

    return (
        <>
            {/* // pass through state variable and handler containing setter to NAV */}
            <Nav
                currentLink={currentLink} handlePageChange={handlePageChange} setCurrentLink={setCurrentLink}

            ></Nav>

            <section className="container">
                {/* <h2 id="header" className="row center-align">Kartik Jevaji</h2> */}

            </section>



        </>
    );
}

export default Header;


