import './PreLoader.scss';
import { useEffect, useState, useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PreLoader = () => {
    const [percent, setPercent] = useState(0);
    const preLoaderContainer = useRef();
    useGSAP(() => {
        gsap.to(".preloader", { y: '100%', duration: 2.5, ease: "power2.inOut", delay: 1 });

    }, {});
    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((prevPercent) => {
                const increment = Math.floor(Math.random() * 10) + 1;
                const newPercent = prevPercent + increment;
                if (newPercent >= 100) {
                    clearInterval(interval);

                    return 100;
                }
                return newPercent;
            });
        }, 80); // Adjust the interval time as needed

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="preloader" ref={preLoaderContainer}>
            <h1>Loading {percent} %</h1>
        </div>
    )
}

export default PreLoader;