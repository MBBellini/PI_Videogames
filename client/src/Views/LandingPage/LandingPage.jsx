import React from 'react'
import "./landing.modules.css"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className= "landingPage-cont"> 
    <div>
    <Link className={"landingPage-home-button"} to= {"home"}>HOME</Link>
    </div>
    </div>
  )
}

export default LandingPage