import React from 'react';
import kjImg from '../../assets/images/kj-thumbnail.jpg'

function About() {
    return (
        <div class="v6_24">
            <img src={kjImg} class="v6_26"></img>
            <div>
                <h1>Kartik Jevaji</h1>
            </div>
            <div>
                <h4 style={{ padding: '3rem' }}>Full Stack Web Developer</h4>
                <h5 style={{ padding: '2rem' }}>Full-stack web developer with strong analytical skills and educated at the University of Minnesota Coding Bootcamp.
                </h5>
                <div className='divider'></div>
                <h5 style={{ padding: '2rem' }}>
                    Strong skills within MERN stack with emphasis on JavaScript and Progressive Web Applications.
                </h5>
                <div className='divider'></div>
                <h5 style={{ padding: '2rem' }}>
                    Experienced with non-profits, CRMs, and databases.
                </h5>
                <div className='divider'></div>

                <h5 style={{ padding: '2rem' }}>
                    Excited to apply learned skills to develop cutting-edge applications and open-source software.
                </h5>
                <div className='divider'></div>

                <h5 style={{ padding: '2rem' }}>A self-described Tekno-junkie that loves learning new languages and is driven to build and perfect.</h5>


            </div>


        </div>


    );
}

export default About;