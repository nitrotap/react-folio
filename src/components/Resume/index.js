import React from 'react';

function Resume() {

    return (
        <div className="container" style={{ padding: 10, backgroundColor: '#14213d', marginTop: 15 }}>
            <h4 className="center-align">
                Resume
            </h4>
            <div className='row'>
                <div>
                    <div className='card blue-grey col s12 m6 center-align' style={{ padding: 20 }}>
                        <h6 className="card-title">
                            Google Docs
                        </h6>
                        <button className='btn' href="https://docs.google.com/document/d/1dR6I9KTetckF0IIcYY65EcRlWII-auqD68jM95KH4Ts/edit?usp=sharing" target="_blank" rel="noreferrer">View Online</button>
                    </div>
                    <div className='card blue-grey col s12 m6 center-align' style={{ padding: 20 }}>
                        <h6 className="center-align card-title">
                            PDF
                        </h6>
                        <button className='btn' href="https://drive.google.com/file/d/1RO-bp1oToL_irxx_srOwqA_7W8tfAXlf/view?usp=sharing" target="_blank" rel="noreferrer">Download</button>
                    </div>
                </div>
            </div>

            <h4 className="center-align">
                Technical Skills
            </h4>
            <div className="card blue-grey" style={{ padding: 20 }}>
                <li>
                    Languages: JavaScript, Java, SQL, R (currently learning Python)
                </li>
                <li>
                    Workflows: Agile and Waterfall using GitHub/GitLab/Jupyter, Functional and OOP paradigms
                </li>
                <li>
                    Server-side: Express.js, Node.js/npm, Jest, Heroku, AWS, Apollo, GraphQL, JAWSDB, service workers, PWAs, RESTful APIs
                </li>
                <li>
                    Front-End: React, HTML, JS, CSS, Materialize, jQuery, Handlebars.js, Material UI (CSS-in-JS), Chart.js
                </li>
                <li>
                    Databases: MySQL, Sequelize, NoSQL, Postgres, MongoDB, Mongoose
                </li>
                <li>
                    Abilities: Excellent written communication skills and highly detail-oriented, Organized and comfortable with multiple projects, Able to work closely in a team or independently with progress reports
                </li>
            </div>
        </div>
    )
}

export default Resume;