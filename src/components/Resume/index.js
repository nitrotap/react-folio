import React from 'react';

function Resume() {

    return (
        <div className="container" style={{ padding: 10, backgroundColor: '#14213d', marginTop: 15, marginBottom: 15, textAlign: 'center' }}>
            <h4 className="center-align animate__animated animate__fadeInDown">
                Resume
            </h4>
            <div className="iframe-container">
                <iframe title="resume" className="responsive-iframe" src="https://drive.google.com/file/d/1MMNjurwxPH7D1fOEkGdBfNK5CSxZ8eBL/preview" allow="autoplay"></iframe>
            </div>

            <div className='row'>
                <div>
                    <div className='card blue-grey col s12 m6 center-align' style={{ padding: 20 }}>
                        <h6 className="card-title">
                            Google Docs
                        </h6>
                        <button className='btn' onClick={() => window.open("https://docs.google.com/document/d/e/2PACX-1vQW72zmDtPK6KZL0JiZ2aP4frmy5XK-w18Ln-K_t9MFtH6m6Q8BUEh_gNbdRQ6XPlNusDJSxYgbCZRX/pub", "_blank")} target="_blank" rel="noreferrer">View Online</button>
                    </div>
                    <div className='card blue-grey col s12 m6 center-align' style={{ padding: 20 }}>
                        <h6 className="center-align card-title">
                            PDF
                        </h6>
                        <button className='btn' onClick={() => window.open("https://drive.google.com/file/d/1MMNjurwxPH7D1fOEkGdBfNK5CSxZ8eBL/view?usp=drive_link", "_blank")} target="_blank" rel="noreferrer">Download</button>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="center-align">
                    Technical Skills
                </h4>
                <div className="card blue-grey" style={{ padding: 20, textAlign: 'left' }}>
                    <li>
                        Languages: JavaScript, TypeScript, Java, SQL, HTML, CSS, PHP, R, SAS
                    </li>
                    <li>
                        Cross-Platform Development: Web, Android, and iOS
                    </li>
                    <li>
                        Frameworks: Angular, React, Ionic, Wordpress
                    </li>
                    <li>
                        Workflows: Agile and Waterfall using GitHub/GitLab/Jupyter, Functional and OOP paradigms
                    </li>
                    <li>
                        Server-side: Express.js, Node.js/npm, Jest, Heroku, AWS, Apollo, GraphQL, JAWSDB, RESTful APIs, PHP, Composer, Linux, Docker
                    </li>
                    <li>
                        Front-End: React, HTML, JS, CSS, Materialize, jQuery, Handlebars.js, Material UI (CSS-in-JS), Chart.js, service workers, PWAs, Angular, Ionic, Capacitor, Cordova
                    </li>
                    <li>
                        Databases: MySQL, Sequelize, NoSQL, Postgres, MongoDB, Mongoose
                    </li>
                    <li>
                        Abilities: Excellent written communication skills and highly detail-oriented, Organized and comfortable with multiple projects, Able to work closely in a team or independently with progress reports.
                    </li>
                    <li>
                        Microsoft Office Suite - Word, Excel, PowerPoint, Teams
                    </li>
                    <li>
                        Google Workspace Suite - APIs and automation tasks
                    </li>
                    <li>
                        Notion Workspace and APIS
                    </li>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 className="center-align">
                        Education
                    </h4>
                    <div className="card blue-grey" style={{ padding: 10, display: 'flex' }}>
                        <div style={{ padding: 10, display: 'flex', alignItems: 'center', width: '30%' }}>
                            <h6 >
                                Regis University <br />
                                Denver, CO
                            </h6>
                        </div>
                        <div style={{ padding: 10, display: 'flex', width: '50%' }}>
                            <h6>
                                Certificate in Full Stack Web Development <br />
                                LAMP Stack
                            </h6>

                        </div>
                        <div style={{ padding: 10, display: 'flex', width: '20%', justifyContent: 'end' }}>
                            <h6 style={{ textAlign: 'left' }}>
                                2023
                            </h6>
                        </div>
                    </div>
                    <div className="card blue-grey" style={{ padding: 10, display: 'flex' }}>
                        <div style={{ padding: 10, display: 'flex', alignItems: 'center', width: '30%', overflow: 'auto' }}>
                            <h6>
                                University of Minnesota <br />
                                Minneapolis, MN
                            </h6>
                        </div>
                        <div style={{ padding: 10, display: 'flex', width: '50%' }}>
                            <h6>
                                Certificate in Full Stack Web Development <br />
                                MERN Stack
                            </h6>

                        </div>
                        <div style={{ padding: 10, display: 'flex', width: '20%', justifyContent: 'end' }}>
                            <h6 style={{ textAlign: 'left' }}>
                                2022
                            </h6>
                        </div>
                    </div>
                    <div className="card blue-grey" style={{ padding: 10, display: 'flex' }}>
                        <div style={{ padding: 10, display: 'flex', alignItems: 'center', width: '30%', overflow: 'auto' }}>
                            <h6>
                                University of Pittsburgh <br />
                                Pittsburgh, PA
                            </h6>
                        </div>
                        <div style={{ padding: 10, display: 'flex', width: '50%' }}>
                            <h6>
                                Master's in Statistics
                            </h6>

                        </div>
                        <div style={{ padding: 10, display: 'flex', width: '20%', justifyContent: 'end' }}>
                            <h6 style={{ textAlign: 'left' }}>
                                2011
                            </h6>
                        </div>
                    </div>
                    <div className="card blue-grey" style={{ padding: 10, display: 'flex' }}>
                        <div style={{ padding: 10, display: 'flex', alignItems: 'center', width: '30%', overflow: 'auto' }}>
                            <h6>
                                University of Pittsburgh <br />
                                Pittsburgh, PA
                            </h6>
                        </div>
                        <div style={{ padding: 10, display: 'flex', width: '50%' }}>
                            <h6>
                                Bachelor's in Statistics
                            </h6>

                        </div>
                        <div style={{ padding: 10, display: 'flex', width: '20%', justifyContent: 'end' }}>
                            <h6 style={{ textAlign: 'left' }}>
                                2011
                            </h6>
                        </div>
                    </div>




                </div>
            </div>
        </div >
    )
}

export default Resume;