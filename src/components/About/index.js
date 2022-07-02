import React from 'react';
import kjImg from '../../assets/images/kj-img.jpg'

function About() {
    return (
        <div style={{ marginTop: 15, padding: 10, marginBottom: 15 }}>
            <section id="about" className="row valign-wrapper">
                <div className='card' style={{ backgroundColor: '#14213d' }}>
                    <div className="col s12 m4">
                        <h3 className="center-align card-title" style={{ fontSize: '30pt', fontWeight: 'bold' }}>About Me</h3>
                        <div className="center-align">
                            <img
                                src={kjImg}
                                className="card-image"
                                alt="kartik" width='100%' />
                        </div>
                    </div>

                    <div className="left-align col s12 m8">
                        <h5 className='card-content'>
                            Full-stack web developer with strong analytical skills and educated at the University of Minnesota Coding Bootcamp.
                        </h5>
                        <div className='divider'></div>
                        <h5 className='card-content'>
                            Strong skills within MERN stack with emphasis on JavaScript and Progressive Web Applications.
                        </h5>
                        <div className='divider'></div>

                        <h5 className='card-content'>
                            Experienced with non-profits, CRMs, and databases.
                        </h5>
                        <div className='divider'></div>

                        <h5 className='card-content'>
                            Excited to apply learned skills to develop cutting-edge applications and open-source software.
                        </h5>
                        <div className='divider'></div>

                        <h5 className='card-content'>A self-described Tekno-junkie that loves learning new languages and is driven to build and perfect.</h5>
                    </div>
                </div>






            </section>
        </div>

    );
}

export default About;