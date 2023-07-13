import React from 'react';

function Footer() {
    return (
        <footer>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossOrigin="anonymous"></link>
            <div className='footer'>
                <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>Made with <span onMouseOver={(e) => e.currentTarget.classList.add('animate__animated', 'animate__heartBeat')}
                    onMouseOut={(e) => { e.currentTarget.classList.remove('animate__animated', 'animate__heartBeat'); }}
                    style={{ color: 'peachpuff' }}>&nbsp;&#x2764;&nbsp;</span> in CO.</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                    <a style={{ backgroundColor: 'rgb(16,24,46)' }} id="profile-link" href="https://github.com/nitrotap" rel="noreferrer" target="_blank" className="btn contact-details"
                        onMouseOver={(e) => e.currentTarget.classList.add('animate__animated', 'animate__heartBeat')}
                        onMouseOut={(e) => { e.currentTarget.classList.remove('animate__animated', 'animate__heartBeat'); }}
                    ><i className="fab fa-github"></i> GitHub</a>

                    <a style={{ backgroundColor: 'rgb(16,24,46)' }} href="https://www.linkedin.com/in/kjevaji/" target="_blank" rel="noreferrer" className="btn contact-details"
                        onMouseOver={(e) => e.currentTarget.classList.add('animate__animated', 'animate__heartBeat')}
                        onMouseOut={(e) => { e.currentTarget.classList.remove('animate__animated', 'animate__heartBeat'); }}
                    ><i className="fab fa-linkedin"></i> LinkedIn</a>

                    <a style={{ backgroundColor: 'rgb(16,24,46)' }} href="mailto:kartikinpublic@gmail.com" className="btn contact-details"
                        onMouseOver={(e) => e.currentTarget.classList.add('animate__animated', 'animate__heartBeat')}
                        onMouseOut={(e) => { e.currentTarget.classList.remove('animate__animated', 'animate__heartBeat'); }}
                    ><i className="fas fa-at"></i> Email</a>
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