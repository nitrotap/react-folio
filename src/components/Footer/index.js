import React from 'react';

function Footer() {
    return (
        <footer>
            <div className='footer'>
                <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>Made with <span style={{ color: 'peachpuff' }}>&nbsp;&#x2764;&nbsp;</span> in CO.</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                    <a id="profile-link" href="https://github.com/freecodecamp" rel="noreferrer" target="_blank" className="btn contact-details"><i className="fab fa-github"></i> GitHub</a>
                    <a href="https://www.linkedin.com/in/kjevaji/" target="_blank" rel="noreferrer" className="btn contact-details"><i className="fab fa-linkedin"></i> LinkedIn</a>
                    <a href="mailto:kartikinpublic@gmail.com" className="btn contact-details"><i className="fas fa-at"></i> Email</a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h6>
                        &copy; 2022 Kartik Jevaji
                    </h6>
                </div>

            </div>


        </footer>
    )

}

export default Footer;