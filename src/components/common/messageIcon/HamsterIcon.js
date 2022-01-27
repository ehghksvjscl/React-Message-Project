import React from 'react'
import Hamster from '../../../assets/icons/ham.png'
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    border-color: transparent;
`

function HamsterIcon() {
    return (
        <div>
            <StyledButton>
                <img src={Hamster} alt="Hamster icon" />
            </StyledButton>
        </div>
    )
}

export default HamsterIcon
