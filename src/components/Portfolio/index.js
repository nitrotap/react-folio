import React from 'react';
import Project from '../Project';

import thgScreenShot from '../../assets/images/thg-screenshot.jpg'
import mhcScreenShot from '../../assets/images/mhc-screen-shot.png'
import pwgScreenShot from '../../assets/images/pw-generator-screen-shot.png'
import cqScreenShot from '../../assets/images/code-quiz-screen-shot.png'
import stScreenShot from '../../assets/images/st-screen-shot.png'
import lmScreenShot from '../../assets/images/lm-screenshot.png'





function Portfolio() {

    const projectList = [
        {
            name: 'Mental Health Check',
            screenshot: mhcScreenShot,
            alt_text: 'mental health check screen shot',
            gitHubLink: 'https://github.com/nitrotap/mental-health-check',
            deployedLink: 'https://nitrotap.github.io/mental-health-check/',
            description: `Mental Health Check is a quiz app that helps users identify their feelings and directs them to helpful resources. The app uses the MERN stack with Apollo/GraphQL combined with Chart.js, Material UI, Heroku, bcrypt, and JSON Web Tokens.`
        },
        {
            name: 'Traveler\'s Hidden Gems',
            screenshot: thgScreenShot,
            alt_text: 'traveler\'s hidden gems screen shot',
            gitHubLink: 'https://github.com/nitrotap/travelers-hidden-gems',
            deployedLink: 'https://sleepy-woodland-16634.herokuapp.com/',
            description: `A travel guide to hidden spots across the United States. Find the offbeat, see something interesting, and share it with others! This app uses leaflet.js, GeoApify API, bcrypt, express-cookies, MySQL and Sequelize ORM, Bootstrap, Handlebars.js, and OpenStreetMaps`
        },
        {
            name: 'Silver Train',
            screenshot: stScreenShot,
            alt_text: '',
            gitHubLink: 'https://github.com/nitrotap/silver-train',
            deployedLink: 'https://desolate-retreat-11992.herokuapp.com/',
            description: `A Progressive Web Application (PWA) for tracking your budget. Offline transactions are uploaded to the database when the connection to the internet is re-established.`
        },
        {
            name: 'Password Generator',
            screenshot: pwgScreenShot,
            alt_text: 'password generator screen shot',
            gitHubLink: 'https://github.com/nitrotap/generate-pw',
            deployedLink: 'https://nitrotap.github.io/generate-pw/',
            description: `A simple password generator using inquirer and node.js. Upon clicking 'Generate Password', the user is guided through simple alerts to decide the strength of their password.`
        },
        {
            name: 'Code Quiz',
            screenshot: cqScreenShot,
            alt_text: 'code quiz screen shot',
            gitHubLink: 'https://github.com/nitrotap/code-quiz',
            deployedLink: 'https://nitrotap.github.io/code-quiz/',
            description: `A coding game styled as a quiz to test your coding knowledge.
            `
        },
        {
            name: 'Line Mash',
            screenshot: lmScreenShot,
            alt_text: '',
            gitHubLink: 'https://github.com/nitrotap/line-mash',
            deployedLink: 'https://nitrotap.github.io/line-mash/',
            description: `A line combinator to help poets put lines together.`
        }
    ]

    const projectHandler = (projectList) => {
        // dynamically generate multiple JSX fragments to put together
        return (
            <div style={{ padding: 10, marginTop: 15, backgroundColor: '#14213d' }}>
                <h3 className="center-align">
                    Portfolio
                </h3>

                {<div className="row card-container">

                    {projectList.map((project) => {
                        return (
                            <Project
                                key={project.name.toString()}
                                name={project.name}
                                screenshot={project.screenshot}
                                alt_text={project.alt_text}
                                gitHubLink={project.gitHubLink}
                                deployedLink={project.deployedLink}
                                description={project.description}
                            ></Project>)
                    })}
                </div>}

            </div>



        )

    }

    let a = projectHandler(projectList)
    // console.log(a);
    return a;
}

export default Portfolio;