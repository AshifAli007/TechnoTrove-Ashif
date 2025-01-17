import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import './Education.scss'
import EducationCard from './EducationCard';

import { educationData } from '../../data/educationData'

function Education() {
    const text = "c = 299 792 458 m / s";

    // Function to split text into individual characters and wrap each character in a span
    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className={index % 5 === 0 ? 'blue' : ''}>{char}</span>
        ));
    };
    const { theme } = useContext(ThemeContext);
    return (
        <div className="education" id="resume" style={{ backgroundColor: theme.secondary }}>

            <div className="education-body">
                <div className="education-description">
                    <h1 style={{ color: theme.primary }}>Education</h1>
                    {educationData.map(edu => (
                        <EducationCard
                            key={edu.id}
                            id={edu.id}
                            institution={edu.institution}
                            course={edu.course}
                            startYear={edu.startYear}
                            endYear={edu.endYear}
                        />
                    ))}
                </div>
                <p>{splitText(text)}</p>
            </div>
        </div>
    )
}

export default Education
