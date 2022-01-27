import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import LinkPage from './views/Link/LinkPage';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import BackgroundImg from "../assets/background.png"
import styled from 'styled-components';
import MessageSelectPage from './views/MessageSelectPage/MessageSelectPage';
import MessageInputPage from './views/MessageInputPage/MessageInputPage';
import CompletedPage from './views/CompletedPage/CompletedPage'
import GetMessage from './views/GetMessage/GetMessage'

const StyledBackGround = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${BackgroundImg});
    background-size: cover;
    position: relative;
`

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <StyledBackGround>
      <Suspense fallback={(<div>Loading...</div>)}>
        <div style={{ paddingTop: '0px', minHeight: 'calc(100vh - 80px)'}}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, false)} />
            <Route path="/link/:id" component={LinkPage} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route path="/messageselect" component={MessageSelectPage} />
            <Route path="/messageinput" component={MessageInputPage} />
            <Route exact path="/completed" component={CompletedPage} />
            <Route exact path="/getmessage" component={Auth(GetMessage)} />
           </Switch>
        </div>
      </Suspense>
    </StyledBackGround>
  );
}

export default App;
