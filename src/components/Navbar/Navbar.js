import React, { useRef } from 'react';
import './Navbar.scss';
import Resume from '../../assets/pdf/resume.pdf';


function Navbar() {
    const container = useRef();
    const nameRef = useRef();
    const positionRef = useRef();


    const handleScrollToAbout = (event) => {
        event.preventDefault();
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className='navbar' ref={container}>
                <div className='navbar--container'>
                    <a href='https://333302723895496704.hello.cv' target='_blank' rel='noreferrer'>
                        <h1 ref={nameRef}>
                            Mohammad Ashif
                        </h1>
                    </a>

                    <h4 ref={positionRef}>
                        Software Engineer
                    </h4>

                </div>
            </div>
            <div >
                <ul className='links'>
                    <li>
                        <a href={Resume} target='_blank' rel='noreferrer'>
                            <span className="line"></span>
                            <span>Resume</span>
                        </a>
                    </li>
                    <li>
                        <a href="#about" onClick={handleScrollToAbout}>
                            <span className="line"></span>
                            <span onClick={() => {
                                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                            }}>About</span>
                        </a>
                    </li>
                </ul>

            </div>
        </>

    );
}

export default Navbar;
