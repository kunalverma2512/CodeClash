import React, { useContext, useEffect } from 'react'
import FeatureSection from '../sections/FeatureSection'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AboutSection1 from '../sections/AboutSection1'
import AboutSection2 from '../sections/AboutSection2'
import Hero from '../sections/Hero'

const LandingPage = () => {

  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    if(user){
      if (window.location.pathname === "/") {
        navigate("/dashboard");
      }
    }
  },[user,navigate])


  return (
    <div className='flex flex-col items-center justify-center'>
      <Hero/>
      <AboutSection1/>
      <AboutSection2/>
      <FeatureSection/>
    </div>
  )
}

export default LandingPage
