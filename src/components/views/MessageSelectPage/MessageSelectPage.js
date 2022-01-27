import React, {useState, useEffect} from 'react';
import PinkButton from '../../common/Buttons/PinkButton';
import styled from 'styled-components';
import {useHistory,useLocation} from 'react-router-dom'
import ani01 from '../../../assets/icons/ani01.png'
import ani02 from '../../../assets/icons/ani02.png'
import ani03 from '../../../assets/icons/ani03.png'
import ani04 from '../../../assets/icons/ani04.png'
import ani05 from '../../../assets/icons/ani05.png'
import ani06 from '../../../assets/icons/ani06.png'
import { useAlert } from 'react-alert'


const StyledTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: 120px;
    margin: 0 auto;
    text-align: center;
`
const StyledRedSpan = styled.span`
    color: red;
`

const StyledIconContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 305px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
`

const StyledButton = styled.button`
    background-color: transparent;
    border-color: transparent;
`

function MessageSelectPage() {
    const history = useHistory();
    const alert = useAlert()
    const location = useLocation();

    useEffect(()=>{
        setName(window.localStorage.getItem("userName"))
    }, [])

    const [name, setName] = useState("")
    const [iconId, setIconId] = useState(0)
    const animals = [
        {num: 1, path : ani01},
        {num: 2, path : ani02},
        {num: 3, path : ani03},
        {num: 4, path : ani04},
        {num: 5, path : ani05},
        {num: 6, path : ani06},
        ]

    const check_and_push = (id) => {
        if(id) {
            history.push({
                pathname: "/messageinput",
                state: {Iconid:id, userId:location.state.userId}
            })
        } else {
            alert.error("캐릭터를 골라 주세요")
        }
    } 
    
    const handleClickedIcon=(id)=>{
        setIconId(id)
        check_and_push(id)
    }
    
    const handleNextButton=()=>{
        check_and_push(iconId)
    }
    
    return (
        <div className="app">
        <StyledTitle>
            <StyledRedSpan>{name}</StyledRedSpan>님에게 어울리는 캐릭터를 골라주세요.
        </StyledTitle> 
        <StyledIconContainer>    
                {animals.map(icon=><StyledButton key={icon.num} onClick={()=>handleClickedIcon(icon.num)}><img src={`${icon.path}`}/> </StyledButton>)}            
        </StyledIconContainer>
        <footer onClick={handleNextButton} style={{width: "100%"}}>
            <PinkButton name="다음으로"/>
        </footer>
        </div>
    )
}

export default MessageSelectPage

