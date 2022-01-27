// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import Tiger from '../../common/Background/Tiger';
import Number from '../../common/Background/Number';
import styled from 'styled-components';
import GoldButton from '../../common/Buttons/GoldButton';
import { useSelector } from "react-redux";
import NavBar from '../NavBar/NavBar';
import { CLIENT_URL, SERVER } from '../../Config';
import Axios from 'axios';
import ani01 from '../../../assets/icons/ani01.png'
import ani02 from '../../../assets/icons/ani02.png'
import ani03 from '../../../assets/icons/ani03.png'
import ani04 from '../../../assets/icons/ani04.png'
import ani05 from '../../../assets/icons/ani05.png'
import ani06 from '../../../assets/icons/ani06.png'
import arrow from '../../../assets/icons/arrowRight.png'
import {useHistory} from 'react-router-dom'
import * as usestate from 'react-usestateref'


const StyledTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    position: absolute;
    top: 120px;
    margin: 0 auto;
`
const ButtonDiv = styled.div`
    margin-top: 18rem;
`
const StyledIconListContainer = styled.div`
    display: flex;
    flex-wrap: no-wrap;
    width: 350px;
    height: 250px;
    position: relative;
    top: 20%;
    margin-left: 30px;
    overflow: hidden;
    z-index: 100;
`
const StyledIconListUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 350px;
    height: 250px;
    padding-left: 0;
    flex-direction: column;
    position: absolute;
    top: 0%;
    z-index: 9;
`
const StyledIconList = styled.li`
    list-style: none;
    width: 33.3%;
    position: relative;
`
const StyledFromUserList = styled.li`
    width: 30%;
    height: 125px;
    position: relative;
    top: 50px;
`


const StyledButtonRight = styled.button`
    width: 10px;
    position: absolute;
    top: 30%;
    right: 6%;
    background-color: transparent;
    border: none;
    z-index: 999;

`

const StyledButtonLeft= styled.button`
width: 10px;
position: absolute;
top: 30%;
left: 6%;
background-color: transparent;
border: none;
transform: rotate(-180deg);
z-index: 999;
`

function LandingPage(props) {
    const history = useHistory()

    const animals = [
        {id: 1, path : ani01},
        {id: 2, path : ani02},
        {id: 3, path : ani03},
        {id: 4, path : ani04},
        {id: 5, path : ani05},
        {id: 6, path : ani06},
        ]
    const user = useSelector(state => state.user)
    const [Messages, setMessages] = useState([])
    const [badges, setBadges] = useState([])
    const [fromUser, setFromUser] = useState([])
    const [clickCount,setClickCount,clickCountRef] = usestate(0)
    const [arrowMove, setArrowMove] = useState(0)

    const handleStartClick = () => {
        props.history.push('/login')
    }
    
    useEffect(() => {
        // 로그인 상태
        if (user.userData && user.userData.isAuth) {
            getMyMessages(user.userData._id)
        }
    }, [user.userData])


    const getMyMessages = (id) => {
        Axios.get(`${SERVER}/api/messages/list/${id}`)
        .then(response=> {
            const badgeArray = []
            const pathArray = []
            const fromUserList = []

            setMessages(response.data.messages)
            response.data.messages.map(meg => {
                badgeArray.push(meg.badge)
                fromUserList.push(meg.fromUserName)
            })
            setFromUser(fromUserList)
            const findId = badgeArray.find((num, index) => {
                // num === animals[index].id
                animals.forEach(item => {
                    if(item.id === num){
                        pathArray.push(item.path)
                    }
                })
            })
            setBadges(pathArray)
        })
    }

    const copyToClipboard = (val) => {
        const t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
        alert("내 주소가 복사 되었습니다.")
      }

    //   state 값 한번 유지 되는 버그 수정 필요
    //   수정 완료
      const handleRightArrow= async ()=>{
        const page = Messages.length / 5
        if (clickCountRef.current > parseInt(page * -1)) {
            setClickCount(clickCount - 1)
            setArrowMove(clickCountRef.current * 350)
        } 
      }

      const handleLeftArrow= async ()=>{
        const page = Messages.length / 5
        if (clickCountRef.current <= parseInt(page * -1)) {
            setClickCount(clickCount + 1)
            setArrowMove(clickCountRef.current * 350)
        } 
    }

    const handleClickedIcon=(index)=>{
        let thisMsg = Messages[index]
        history.push({
            pathname : '/getmessage',
            state : {
                thisMsg : thisMsg
            }
        })
    }

    // 로그인 안했을 경우
    if (user.userData && !user.userData.isAuth) {
        return (
            <>
                <div className="app">
                    <NavBar />
                    <Number />
                    <StyledTitle>새해 복 많이 주세요.</StyledTitle>
                    <Tiger />
                    <StyledIconListContainer>
                        <StyledIconListUl>
                        {badges.map((iconNum, index) => <StyledIconList key={index}><img src={iconNum}/></StyledIconList>)}
                        </StyledIconListUl>
                    </StyledIconListContainer>                   
                    <ButtonDiv>
                        <GoldButton name="시작하기" onClick={handleStartClick}/>
                    </ButtonDiv>
                </div>
            </>
        )
    } else {
        // 로그인 했을 경우
        return (
            <>
                <div className="app">
                    <NavBar />
                    <Number />
                    <StyledTitle>새해 복 많이 주세요.</StyledTitle>
                    {/* 본인 메시지 리스트 */}
                    <Tiger />
                    <StyledButtonLeft onClick={handleLeftArrow}>
                        <img src={arrow} />
                    </StyledButtonLeft>
                    <StyledIconListContainer>
                        <StyledIconListUl style={{left: `${arrowMove}px`}}>
                            {badges.map((iconNum, index) => <StyledIconList onClick={()=>handleClickedIcon(index)} key={index}><img src={iconNum}/></StyledIconList>)}
                        </StyledIconListUl>
                    </StyledIconListContainer>
                    <StyledButtonRight onClick={handleRightArrow}>
                        <img src={arrow} />
                    </StyledButtonRight>
                    <ButtonDiv>
                        <GoldButton name="내 링크 복사" onClick={() => copyToClipboard(`${CLIENT_URL}/link/${user.userData._id}`)}/>
                    </ButtonDiv>
                </div>
            </>
        )
    }

}

export default LandingPage
