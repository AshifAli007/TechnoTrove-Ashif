import React, { useContext } from 'react';

import './About.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { aboutData } from '../../data/aboutData'
// import atom from '../../assets/svg/atom.svg'
import { ReactComponent as AtomIcon } from '../../assets/svg/atom1.svg'; // Import SVG as a component
import profileImg from '../../assets/about2.png';

function About() {

    const { theme } = useContext(ThemeContext);
    return (
        <div className="about" id="about" style={{ backgroundColor: theme.secondary }}>
            {/* <div className="line-styling">
              <div className="style-circle" style={{backgroundColor: theme.primary}}></div>
              <div className="style-circle" style={{backgroundColor: theme.primary}}></div>
              <div className="style-line" style={{backgroundColor: theme.primary}}></div>
            </div> */}
            <div className="about-body">
                <div className="about-description">
                    <h2 style={{ color: theme.primary }}>{aboutData.title}</h2>
                    <p style={{ color: theme.tertiary80 }}>{aboutData.description1}</p>
                    <br />
                    <p style={{ color: theme.tertiary80 }}>{aboutData.description2}</p>
                    <br />
                    <p style={{ color: theme.tertiary80 }}>{aboutData.description3}</p>
                </div>
                <div className="about-img">
                    <img
                        src={profileImg}
                        alt="About"
                        style={{ maxWidth: '200px', width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '12px' }}
                    />
                </div>
            </div>
        </div>

    )
}

export default About
