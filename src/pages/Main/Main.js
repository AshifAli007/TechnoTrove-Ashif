import { React } from 'react'
import { Helmet } from 'react-helmet'
import Galaxy from '../Galaxy/Galaxy.js'
import { Navbar, About, Skills, Testimonials, Blog, Education, Experience, Contacts, Projects, Services, Achievement, PreLoader } from '../../components'
import { headerData } from '../../data/headerData'

function Main() {
    return (
        <div>


            <PreLoader />
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
