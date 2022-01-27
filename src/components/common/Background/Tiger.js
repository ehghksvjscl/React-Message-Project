import React from 'react'
import TigerImg from "../../../assets/tiger.png"


function Tiger() {
    return (
        <>
            <img src={`${TigerImg}`} style={{position: "absolute", bottom:"15%", margin: "0 auto"}} alt="Tiger image"/>
        </>
    )
}

export default Tiger
