import React from 'react';

import gitHubLogo from '../../assets/images/GitHub_Logo.png'
import lILogo from '../../assets/images/LI-Logo.png'

function Contact() {

    return (
        <section className="container" style={{ backgroundColor: '#14213d', padding: 10, marginTop: 15, marginBottom: 15 }}>
            <h4 className="center-align">Contact Info</h4>
            <div className='row'>
                <div className="col s12 center-align">
                    <div className='card blue-grey'>
                        <p className='card-title '>Email me at kartikinpublic@gmail.com</p>
                        <button type="button">
                            <a href="mailto:kartikinpublic@gmail.com" target="_blank" rel="noreferrer">
                                <i className='medium material-icons'>email</i>
                            </a>
                        </button>
                    </div>
                </div>
                <div className="col s12 center-align">
                    <div className='card blue-grey'>
                        <p className='card-title '>Find me on GitHub</p>
                        <button type="button">
                            <a href="https://github.com/nitrotap" target="_blank" rel="noreferrer">
                                <img src={gitHubLogo} width="150px" className='white' alt="Find me on Github" />
                            </a>
                        </button>
                    </div>
                </div>
                <div className="col s12 center-align">
                    <div className='card blue-grey'>
                        <p className='card-title '>Message me on LinkedIn</p>
                        <button type="button">
                            <a href="https://www.linkedin.com/in/kjevaji/" target="_blank" style={{ padding: 20 }} rel="noreferrer">
                                <img src={lILogo} width="150px" className='white' alt="Find me on Github" />
                            </a>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Contact;
