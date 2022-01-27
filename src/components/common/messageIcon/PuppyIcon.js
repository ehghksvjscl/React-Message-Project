import React from 'react'
import Puppy from '../../../assets/icons/dog.png'
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    border-color: transparent;
`

function PuppyIcon() {
    return (
        <div>
        <StyledButton>
            <img src={Puppy} alt="puppy icon" /> 
        </StyledButton>
        </div>
    )
}

export default PuppyIcon
