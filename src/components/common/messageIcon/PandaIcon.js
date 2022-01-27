import React from 'react'
import Panda from '../../../assets/icons/panda.png'
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    border-color: transparent;
`

function PandaIcon() {
    return (
        <div>
            <StyledButton>
                <img src={Panda} alt="panda icon" />
            </StyledButton>
        </div>
    )
}

export default PandaIcon
