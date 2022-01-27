import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import PinkButton from '../../common/Buttons/PinkButton';
import MessageInput from '..//../../assets/messageInput.png';
import {useHistory,useLocation} from 'react-router-dom'
import ani01 from '../../../assets/icons/ani01.png'
import ani02 from '../../../assets/icons/ani02.png'
import ani03 from '../../../assets/icons/ani03.png'
import ani04 from '../../../assets/icons/ani04.png'
import ani05 from '../../../assets/icons/ani05.png'
import ani06 from '../../../assets/icons/ani06.png'
import Axios from 'axios';
import { useAlert } from 'react-alert'
import { SERVER } from '../../Config';



const StyledMessageInput = styled.div`
    width: 100%;
    height: 393px;
    background-image: url(${MessageInput});
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    
`
const StyledTo = styled.p`
    font-size: 24px;
    color: #000;
    position: absolute;
    top: 15%;
    left: 10%;
`
const StyledFrom = styled.p`
    font-size: 24px;
    color: #000;
    position: absolute;
    Bottom: 10%;
    left: 13%;
`

const StyledTextArea = styled.textarea`
    width: 70%;
    height: 185px;
    position: absolute;
    top: 25%;
    left: 10%;
    resize: none;
    border: none;
    font-size: 24px;
`

const StyledIcon = styled.img`
    position: absolute;
    top:-8%;
    left: 35%;
`

const StyledSenderInput = styled.input`
    width: 70%;
    border: none;
`

function MessageInputPage() {
    const alert = useAlert()
    const location = useLocation();
    const history = useHistory()
    const [ recepient, setRecepient ] = useState("")
    const [ sender, setSender ] = useState("")
    const [icon, setIcon] = useState(1)
    const animals = [
        {num: 1, path : ani01},
        {num: 2, path : ani02},
        {num: 3, path : ani03},
        {num: 4, path : ani04},
        {num: 5, path : ani05},
        {num: 6, path : ani06},
        ]
    const textAreaRef = useRef()
    const FromInput = useRef()

    useEffect(()=>{
        setRecepient(window.localStorage.getItem("userName"))
        console.log(location.state.Iconid);
        const pickedIcon = animals.find(icon => icon.num === location.state.Iconid)
        setIcon(pickedIcon.path)
    }, [])

    const handleOnchangeSender=(e)=>{
        setSender(e.target.value)
    }

    const handleNextButton=()=>{
        const {userId, Iconid} = location.state

        let body = {
            user_id: userId,
            badge: Iconid,
            content: textAreaRef.current.value,
            fromUserName: FromInput.current.value
        }

        Axios.post(`${SERVER}/api/messages/addMessage`, body)
        .then(response => {
            if(response.data.success) {
                history.push({
                    pathname: "/completed",
                })
            } else {
                // 각각 예외처리 필요
                alert.error("메세지 전송에 실패 했습니다.")
            }
        })

    }

    return (
        <div className='app'>
            <StyledMessageInput>
                <StyledTo>To.{recepient}</StyledTo>
                <StyledIcon src={icon} />
                <StyledTextArea maxLength="300" ref={textAreaRef} placeholder='메세지를 입력해주세요...'/>
                <StyledFrom>From.<StyledSenderInput ref={FromInput} name="senderName" onChange={handleOnchangeSender} value={sender} placeholder="이름을 입력해주세요"/></StyledFrom>
            </StyledMessageInput>
            <footer onClick={handleNextButton} style={{width: "100%"}}>
            <PinkButton name="다음으로"/>
            </footer>
        </div>
    )
}

export default MessageInputPage
