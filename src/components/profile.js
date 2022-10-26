import React from 'react'
import About from './about'
import Contact from './contact'
import Experience from './experience'
import TopNav from './topnav'
import Footer from './footer'

const Profile = () => {
  return (
    <div>
        <TopNav />
        <About />
        <Experience />
        <Contact />
        <Footer />
    </div>
  )
}

export default Profile