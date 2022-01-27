import React from 'react'
import Koala from '../../../assets/icons/koalra.png'
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: transparent;
    border-color: transparent;
`

function KoalaIcon() {
    return (
        <div>
            <StyledButton>
                <img src={Koala} alt="koala icon" />
            </StyledButton>
        </div>
    )
}

export default KoalaIcon
