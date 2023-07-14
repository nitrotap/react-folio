import React from 'react';
import './About.css';
import kjImg from '../../assets/images/kj-thumbnail.jpg';

function About() {
    return (
        <div className=''>
            <div className="v6_24 bgimg-1">
                <div>
                    <div className="profileContainer">
                        <div className="profile" style={{ paddingBottom: '1rem' }}>
                            <img alt="kartik" src={kjImg} className="profileImage v6_26"></img>
                        </div>
                        <div style={{ padding: '1rem', backgroundColor: 'rgb(42,55,62)' }}>
                            <h1 className="profileName animate__animated animate__bounce lato-text">Kartik Jevaji</h1>
                        </div>

                    </div>
                </div>
            </div>
            <div className="v6_24">
                <h4 className="animate__animated animate__fadeIn lato-text" style={{ paddingBottom: '1rem' }}>Full Stack Web Developer</h4>
                <div style={{ backgroundColor: 'rgb(42,55,62)' }}>
                    <h5 className="animate__animated animate__fadeIn" style={{ padding: '1rem' }}>Combining exemplary communication and analytical skills with a notable track record in the non-profit sector, CRMs, and databases.</h5>
                    <h5 className="animate__animated animate__fadeIn" style={{ padding: '1rem' }}>
                        Exhibits organizational skills honed through professional experience juggling multiple projects, both in collaborative teams and autonomous settings.
                    </h5>
                    <h5 className="animate__animated animate__fadeIn animate__delay-1s" style={{ padding: '1rem' }}>
                        Adept at troubleshooting with a natural aptitude for problem-solving.
                    </h5>

                </div>
            </div>
            <div className="v6_24 bgimg-2">

                <div className="animate__animated animate__fadeInUp animate__delay-1s">
                    <h2 style={{ padding: '1rem', backgroundColor: 'rgb(42,55,62)' }} className='lato-text'>Technical Skills</h2>
                </div>
            </div>
            <div className="animate__animated animate__fadeInUp animate__delay-1s">
                <div className="v6_24">
                    <div style={{ backgroundColor: 'rgb(42,55,62)', padding: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <h3>Languages</h3>
                        </div>
                        <div>
                            <h5>JavaScript | TypeScript | PHP | HTML | CSS | SQL | Java</h5>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'rgb(42,55,62)', padding: '1rem', marginBottom: '1rem' }}>
                        <h3>Technologies</h3>

                        <h5>Apache | Express.js | Node.js/npm | Apollo | GraphQL | AWS | REST APIs | React | jQuery | Apache | Angular | Ionic | Cordova</h5>
                    </div>
                    <div style={{ backgroundColor: 'rgb(42,55,62)', padding: '1rem', marginBottom: '1rem' }}>
                        <h3>Databases</h3>
                        <h5>MySQL | Postgres | Sequelize | MongoDB | Mongoose</h5>
                    </div>
                </div>
                <div style={{}} className='animate__animated animate__fadeInUp animate__delay-2s'>
                </div>
                <div className="v6_24 bgimg-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <h2 style={{ padding: '1rem', backgroundColor: 'rgb(42,55,62)' }} className='lato-text'>Relevant Experience</h2>
                </div>
                <div className="v6_24 animate__animated animate__fadeInUp animate__delay-2s">

                    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: 'rgb(42,55,62)', marginBottom: '1rem' }}>
                        <h4>Mental Health Check</h4>
                        <h5><a href='https://www.mhcheck.app'>mhcheck.app</a></h5>
                        <p>Developer and Creator | <a href="https://github.com/nitrotap/mental-health-check">github.com/nitrotap/mental-health-check</a></p>
                        <p>Created mental health quiz progressive web app that helps users track their moods and check-in.</p>
                        <div style={{ padding: '1rem' }}>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=MongoDB&logoColor=white" alt="MongoDB Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=Express&logoColor=white" alt="Express.js Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Node-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="Node.js Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/ApolloServer-311C87?style=for-the-badge&logoColor=white" alt="Apollo Server Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=GraphQL&logoColor=white" alt="GraphQL Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=Chart.js&logoColor=white" alt="Chart.js Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/MaterialUI-0081CB?style=for-the-badge&logo=Material-UI&logoColor=white" alt="Material UI Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" alt="Heroku Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/bcrypt-5A6E9C?style=for-the-badge&logoColor=white" alt="bcrypt Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/JSONWebTokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JSON Web Tokens Badge"></img>
                        </div>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: 'rgb(42,55,62)', marginBottom: '1rem' }}>
                        <h4>Brain Lift</h4>
                        <h5><a href='https://www.brain-lift.org'>brain-lift.org</a></h5>

                        <p>Developer and Creator | <a href="https://github.com/nitrotap/brain-lift">github.com/nitrotap/brain-lift</a></p>
                        <p>Designed and developed a full-stack cross-platform application to help users learn, measure, and track their cognitive load using the NASA Task Load Index in web, iOS, and Android</p>
                        <div style={{ padding: '1rem' }}>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=white" alt="MariaDB Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=Apache&logoColor=white" alt="Apache Server Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" alt="Ubuntu Linux Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=Ionic&logoColor=white" alt="Ionic Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=Angular&logoColor=white" alt="Angular Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=Capacitor&logoColor=white" alt="Capacitor Badge"></img>
                            <img style={{ margin: '2px' }} src="https://img.shields.io/badge/Cordova-E8E8E8?style=for-the-badge&logo=Apache-Cordova&logoColor=black" alt="Cordova Badge"></img>
                        </div>
                    </div>

                    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: 'rgb(42,55,62)', marginBottom: '1rem' }}>
                        <h4>Data Entry/Tech Support</h4>
                        <h5>2017 – Current</h5>
                        <h5>Volunteer | Alzheimer’s Association Denver, CO</h5>
                        <p>Critical thinking used to ensure accuracy of key database identifiers</p>
                        <p>Quick problem-solving during education classes providing on-demand tech support virtually
                        </p>
                        <p>
                            Provide excellent customer service to increase volunteer engagement
                        </p>
                        <p>
                            Implemented Google Sheets API to automate business processes
                        </p>
                    </div>

                    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: 'rgb(42,55,62)', marginBottom: '1rem' }}>
                        <h4>Independent Contractor</h4>
                        <h5>Present </h5>
                        <h5>Uber | Denver, CO</h5>
                        <p>Provided excellent service to a diverse passenger base</p>
                        <p>Maintained an impeccable safety record by strictly following traffic rules</p>
                        <p>Successfully operated as an independent contractor, balancing finances and customer satisfaction</p>
                    </div>
                </div>
            </div>
            <div className="v6_24 bgimg-4"></div>

        </div>
    );
}

export default About;
