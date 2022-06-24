import React from "react";

function Project(props) {
    // generate a project
    // name, screenshot, alt text, gitHubLink, deployedLink
    const { name, gitHubLink, deployedLink, screenshot, alt_text, description } = props;

    return (
        <div className="col s12 m6">
            <div className="card blue-grey">
                <div className="card-image">
                    <img
                        src={screenshot}
                        height="300px"
                        alt={alt_text}
                    ></img>
                </div>
                <h2 className="card-title center-align" style={{ fontWeight: "bolder" }}>{name}</h2>
                <div className="card-content">
                    <p>{description}</p>
                </div>
                <div className="card-action center-align">
                    <a href={gitHubLink} target="_blank" rel="noreferrer">GitHub</a>
                    <a href={deployedLink} target="_blank" rel="noreferrer">Deployed Link</a>
                </div>
            </div>
        </div >
    )
}


export default Project;