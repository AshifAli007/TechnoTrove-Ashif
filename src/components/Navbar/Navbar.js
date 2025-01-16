import React, { useRef, useState } from 'react';
import './Navbar.scss';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);


function Navbar() {
    const container = useRef();
    useGSAP(() => {
        // gsap code here...
        // gsap.from(".right", { x: 200, duration: 1.5, opacity: 0 });
        // gsap.to(".right", { y: 300, duration: 1.5, delay: 1.5 });

        gsap.from(".navbar--container > h1", { x: -200, duration: 1.5, opacity: 0, delay: 1.5 });

    }, { scope: container });

    return (
        <>
            <div className='navbar' ref={container}>
                <div className='navbar--container'>
                    <h1 style={{ color: '#89d3ce' }}>
                        Mohammad Ashif
                    </h1>

                </div>
            </div>
            <div >
                <ul className='links'>
                    <li>
                        <a href='#'>
                            <span className="line"></span>
                            <span>Experience</span>
                        </a>
                    </li>
                    <li>
                        <a href='#'>
                            <span className="line"></span>
                            <span>About</span>
                        </a>
                    </li>
                </ul>

            </div>
        </>

    );
}

export default Navbar;
