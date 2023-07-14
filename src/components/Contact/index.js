import React from 'react';

import gitHubLogo from '../../assets/images/GitHub_Logo.png'

function Contact() {

    return (
        <>
            <section className="container" style={{ backgroundColor: '#14213d', padding: 10, marginTop: 15, marginBottom: 15 }}>
                <h4 className="center-align animate__animated animate__fadeInDown">Contact Info</h4>
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
                            <div className='card-content'>
                                <a href="https://www.linkedin.com/in/kjevaji/" target="_blank" rel="noreferrer">
                                    <i className="fab fa-linkedin fa-4x" style={{ backgroundColor: 'white', borderRadius: '0', padding: '5px' }}>
                                    </i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <div style={{ backgroundColor: '#14213d', padding: 10, marginTop: 15, marginBottom: 15, textAlign: 'center', overflow: 'visible' }} className='container'>
                <div style={{
                    position: 'relative',
                    paddingBottom: '75%', // This value could be adjusted
                    minHeight: 950,
                    overflow: 'hidden',
                    maxWidth: '100%'
                }}>
                    <iframe title="contact-form" src="https://docs.google.com/forms/d/e/1FAIpQLSegICNU6bus_7m8fAsmnWB3i5sQg18Sdn1QY34ac7oCXAqI-g/viewform?embedded=true" style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        border: '0'
                    }}>
                        Loading…
                    </iframe>
                </div>
            </div>



        </>
    );
}

export default Contact;
