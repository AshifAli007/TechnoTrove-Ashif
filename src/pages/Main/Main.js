import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import Galaxy from '../Galaxy/Galaxy.js'
import { Navbar, Footer, Landing, About, Skills, Testimonials, Blog, Education, Experience, Contacts, Projects, Services, Achievement, PreLoader } from '../../components'
import { headerData } from '../../data/headerData'

function Main() {
    const [loading, setLoading] = useState(true)
    return (
        <div>


            <PreLoader setLoading={setLoading} />
            <Helmet>
                <title>{headerData.name} - Porfolio</title>
            </Helmet>
            <Navbar />
            <Galaxy />
            <About />
            <Education />
            <Skills />
            <Experience />
            <Projects />
            <Achievement />
            <Services />
            <Testimonials />
            <Blog />
            <Contacts />
            {/* <Footer /> */}


        </div>
    )
}

export default Main
