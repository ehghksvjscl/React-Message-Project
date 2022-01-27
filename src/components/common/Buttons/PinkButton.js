import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

const StyledPinkButton = styled.button`
    width: 213px;
    height: 43px;
    border-radius: 30px;
    background-color: #F974C4;
    color: #fff;
    border none;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    line-height: 43px;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
`

function PinkButton(props) {
    const [buttonTitle, setButtonTitle] = useState("")
        useEffect(()=>{
            setButtonTitle(props.name)
    },[props.name])
    
    return (
        <>
        <StyledPinkButton type='submit'>
            <p>{buttonTitle}</p>
        </StyledPinkButton>   
        </>
    )
}

export default PinkButton
