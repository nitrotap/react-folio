import React from 'react';
import gitHubLogo from '../../assets/images/GitHub-Mark-120px-plus.png'
import linkedInLogo from '../../assets/images/LI-In-Bug.png'

function Footer() {
    return (
        <footer className="center-align container" style={{ marginTop: '20px' }}>
            <section className='center-align row'>
                <h4 className='col s12 m2'>Made with <span>&#x2764;</span> in CO.</h4>
                <div className="col s12 m2">
                    <p>GitHub</p>
                    <button type='button'>
                        <a href="https://github.com/nitrotap" target="_blank" rel="noreferrer">
                            <img src={gitHubLogo} width="50px" className='white' alt="Find me on Github" />
                        </a>
                    </button>
                </div>
                <div className="col s12 m2">
                    <p>LinkedIn</p>
                    <button type="button">
                        <a href="https://www.linkedin.com/in/kjevaji/" target="_blank" rel="noreferrer">
                            <img src={linkedInLogo} width="60px" alt="Find me on LinkedIn" />
                        </a>
                    </button>
                </div>
                <div className="col s12 m2">
                    <p>Email</p>
                    <button type="button">
                        <a href="mailto:kartikinpublic@gmail.com" target="_blank" rel="noreferrer">
                            <i className='medium material-icons'>email</i>
                        </a>
                    </button>
                </div>
                <div className='col s12 m2'>&copy; 2022 Kartik Jevaji</div>

            </section>

        </footer>
    )

}

export default Footer;