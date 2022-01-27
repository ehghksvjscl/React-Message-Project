import React from 'react'
import {useHistory} from "react-router-dom"
import Num from "../../../assets/home.png"

function Home() {
    const history = useHistory()

    return (
        <>
          <img src ={`${Num}`} alt="home" style={{
            position:"absolute", 
            top:"20px", 
            display: "flex", 
            left: "20px",
            cursor: "pointer"
            }} onClick={() => history.push("/")}/>  
        </>
    )
}

export default Home
