import React from 'react';

function Footer() {
    return (
        <footer>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous"></link>
            <div className='footer'>
                <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>Made with <span style={{ color: 'peachpuff' }}>&nbsp;&#x2764;&nbsp;</span> in CO.</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                    <a id="profile-link" href="https://github.com/freecodecamp" rel="noreferrer" target="_blank" class="btn contact-details"><i class="fab fa-github"></i> GitHub</a>
                    <a href="https://www.linkedin.com/in/kjevaji/" target="_blank" rel="noreferrer" class="btn contact-details"><i class="fab fa-linkedin"></i> LinkedIn</a>
                    <a href="mailto:kartikinpublic@gmail.com" class="btn contact-details"><i class="fas fa-at"></i> Email</a>
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