import React from 'react'
import Tiger from '../../common/Background/Tiger';
import Number from '../../common/Background/Number';
import styled from 'styled-components';
import PinkButton from '../../common/Buttons/PinkButton'
import {useHistory,useLocation} from 'react-router-dom'


const StyledTitleBox = styled.div`
    position: absolute;
    top: 120px;
`
const StyledTitle = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin: 0 auto;
`

function CompletedPage() {
    const location = useLocation();
    const history = useHistory()
    const handleNextButton=()=>{
        history.push({
            pathname: "/",
        })
    }
    return (
        <>
            <div className="app">
                <Number />
                <StyledTitleBox>
                <StyledTitle>덕담 전송이 완료되었습니다!</StyledTitle>
                <StyledTitle>호랑이 기운 받는 한 해 되세요</StyledTitle>
                </StyledTitleBox>
                <Tiger />
                <footer onClick={handleNextButton} style={{width: "100%"}}>
                <PinkButton name="홈 으로"/>
                </footer>
            </div>
        </>
    )
}

export default CompletedPage