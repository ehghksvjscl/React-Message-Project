import React from 'react'
import Cat from '../../../assets/icons/cat.png'
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    border-color: transparent;
`


function CatIcon() {
    return (
        <div>
            <StyledButton>
                <img src={Cat} alt="Cat icon" /> 
            </StyledButton>
        </div>
    )
}

export default CatIcon
