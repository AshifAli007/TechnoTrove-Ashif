import React from 'react';
import { Button } from '@mui/material';
import { NavHashLink as NavLink } from 'react-router-hash-link';

import './Landing.css';
import { headerData } from '../../data/headerData';
import { socialsData } from '../../data/socialsData';

import {
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaCode,
    FaCodepen,
} from 'react-icons/fa';

function Landing() {
    return (
        <div className='landing'>
            <div className='landing--container'>
                <div className='landing--container-left' style={{ backgroundColor: '#3fc337' }}>
                    <div className='lcl--content'>
                        {socialsData.linkedIn && (
                            <a href={socialsData.linkedIn} target='_blank' rel='noreferrer'>
                                <FaLinkedin
                                    className='landing--social'
                                    style={{ color: '#EAEAEA' }}
                                    aria-label='LinkedIn'
                                />
                            </a>
                        )}
                        {socialsData.github && (
                            <a href={socialsData.github} target='_blank' rel='noreferrer'>
                                <FaGithub
                                    className='landing--social'
                                    style={{ color: '#EAEAEA' }}
                                    aria-label='GitHub'
                                />
                            </a>
                        )}
                        {socialsData.twitter && (
                            <a href={socialsData.twitter} target='_blank' rel='noreferrer'>
                                <FaTwitter
                                    className='landing--social'
                                    style={{ color: '#EAEAEA' }}
                                    aria-label='Twitter'
                                />
                            </a>
                        )}
                        {socialsData.leetcode && (
                            <a href={socialsData.leetcode} target='_blank' rel='noreferrer'>
                                <FaCode
                                    className='landing--social'
                                    style={{ color: '#EAEAEA' }}
                                    aria-label='LeetCode'
                                />
                            </a>
                        )}
                        {socialsData.codepen && (
                            <a href={socialsData.codepen} target='_blank' rel='noreferrer'>
                                <FaCodepen
                                    className='landing--social'
                                    style={{ color: '#EAEAEA' }}
                                    aria-label='CodePen'
                                />
                            </a>
                        )}
                    </div>
                </div>
                <img
                    src={headerData.image}
                    alt=''
                    className='landing--img'
                    style={{
                        opacity: '1',
                        borderColor: '#EAEAEA',
                    }}
                />
                <div className='landing--container-right' style={{ backgroundColor: '#EAEAEA' }}>
                    <div className='lcr--content' style={{ color: '#212121' }}>
                        <h6>{headerData.title}</h6>
                        <h1>Mohammad Ashif</h1>
                        <p>{headerData.desciption}</p>

                        <div className='lcr-buttonContainer'>
                            {headerData.resumePdf && (
                                <a
                                    href={headerData.resumePdf}
                                    download='resume'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <Button
                                        style={{
                                            color: '#3fc337',
                                            borderRadius: '30px',
                                            textTransform: 'inherit',
                                            textDecoration: 'none',
                                            width: '150px',
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            height: '50px',
                                            fontFamily: 'Arial, sans-serif',
                                            border: '3px solid #3fc337',
                                            transition: '100ms ease-out',
                                        }}
                                    >
                                        Download CV
                                    </Button>
                                </a>
                            )}
                            <NavLink
                                to='/#contacts'
                                smooth={true}
                                spy={true}
                                duration={2000}
                                className='contact-button'
                            >
                                <Button
                                    style={{
                                        backgroundColor: '#3fc337',
                                        color: '#EAEAEA',
                                        borderRadius: '30px',
                                        textTransform: 'inherit',
                                        textDecoration: 'none',
                                        width: '150px',
                                        height: '50px',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        fontFamily: 'Arial, sans-serif',
                                        border: '3px solid #3fc337',
                                        transition: '100ms ease-out',
                                    }}
                                >
                                    Contact
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
