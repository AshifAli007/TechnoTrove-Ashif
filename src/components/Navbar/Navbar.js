import React, { useRef } from 'react';
import './Navbar.scss';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Resume from '../../assets/pdf/resume.pdf';


gsap.registerPlugin(useGSAP);



function Navbar() {
    const container = useRef();
    const nameRef = useRef();
    const positionRef = useRef();

    useGSAP(() => {
        const splitText = (element) => {
            const text = element.innerText;
            element.innerHTML = text.split('').map(char => {
                if (char === ' ') {
                    return `<span class="char">&nbsp;</span>`;
                }
                return `<span class="char">${char}</span>`;
            }).join('');
        };
        splitText(nameRef.current);
        splitText(positionRef.current);

        gsap.from('.char', {
            x: '-50%',
            opacity: 0,
            duration: 10,
            ease: 'power2.out',
            stagger: 0.05,
            delay: 4
        });




        gsap.from(".links", { x: '-50%', duration: 1.5, opacity: 0, delay: 4, ease: "power2.inOut" });

    }, {});

    const handleScrollToAbout = (event) => {
        event.preventDefault();
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className='navbar' ref={container}>
                <div className='navbar--container'>
                    <a href='https://read.cv/ashifdesigns' target='_blank' rel='noreferrer'>
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
