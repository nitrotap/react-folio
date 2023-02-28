import React from 'react';

import gitHubLogo from '../../assets/images/GitHub_Logo.png'

function Contact() {

    return (
        <section className="container" style={{ backgroundColor: '#14213d', padding: 10, marginTop: 15, marginBottom: 15 }}>
            <h4 className="center-align">Contact Info</h4>
            <div className='row'>
                <div className="col s12 center-align">
                    <div className='card blue-grey'>
                        <p className='card-title' style={{ overflow: 'auto' }}>Email me at kartikinpublic@gmail.com</p>
                        <div className='card-content'>
                            <a href="mailto:kartikinpublic@gmail.com" target="_blank" rel="noreferrer">
                                <i className='medium material-icons' style={{ backgroundColor: 'white', padding: '5px', borderRadius: '0', }}>email</i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col s12 center-align">
                    <div className='card blue-grey'>
                        <p className='card-title '>Find me on GitHub</p>
                        <div className='card-content'>
                            <a href="https://github.com/nitrotap" target="_blank" rel="noreferrer">
                                <img src={gitHubLogo} width="150px" className='white' style={{ borderRadius: '0', }} alt="Find me on Github" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col s12 center-align">
                    <div className='card blue-grey'>
                        <p className='card-title'>Message me on LinkedIn</p>
                        <div class='card-content'>
                            <a href="https://www.linkedin.com/in/kjevaji/" target="_blank" rel="noreferrer">
                                <i class="fab fa-linkedin fa-4x" style={{ backgroundColor: 'white', borderRadius: '0', padding: '5px' }}>
                                </i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section >
    );
}

export default Contact;
