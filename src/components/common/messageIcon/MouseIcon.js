import React from 'react'
import Mouse from '../../../assets/icons/mouse.png'
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    border-color: transparent;
`

function MouseIcon() {
    return (
        <div>
            <StyledButton>
                <img src={Mouse} alt="Mouse Icon" />
            </StyledButton>
        </div>
    )
}

export default MouseIcon
