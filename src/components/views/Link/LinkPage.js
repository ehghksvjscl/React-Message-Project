import React, { useEffect, useState } from "react";
import Tiger from "../../common/Background/Tiger";
import Number from "../../common/Background/Number";
import PinkButton from "../../common/Buttons/PinkButton";
import styled from "styled-components";
import Axios from "axios";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";
import NavBar from "../NavBar/NavBar";
import { SERVER } from "../../Config";

const StyledTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 120px;
  margin: 0 auto;
  text-align: center;
`;
const StyledRedSpan = styled.span`
  color: red;
`;

function LinkPage({ match }) {
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    Axios.get(`${SERVER}/api/messages/list/${match.params.id}`)
      .then((response) => {
        setMsgNum(response.data.messages.length);
      })
      .catch(() => {
        alert.error("잘못된 접근입니다.");
        history.push("/");
      });

    Axios.get(`${SERVER}/api/messages/getname/${match.params.id}`)
      .then((response) => {
        setName(response.data.user);
        window.localStorage.setItem("userName", response.data.user);
      })
      .catch(() => {
        history.push("/");
      });
  }, [match.params.id]);

  const [name, setName] = useState("");
  const [msgNum, setMsgNum] = useState(0);

  const handleNextButton = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/messageselect",
      name: name,
      state: { userId: match.params.id },
    });
  };

  return (
    <div className="app">
      <NavBar />
      <Number />
      <StyledTitle>
        <p>
          <StyledRedSpan>{name}</StyledRedSpan>님의 복주머니에{" "}
          <StyledRedSpan>{msgNum}</StyledRedSpan>개의 복주머니가 있습니다.
        </p>
        <p>
          확인은 <StyledRedSpan>설날(2/1)</StyledRedSpan>에 가능합니다.
        </p>
      </StyledTitle>
      <Tiger />
      <footer
        onClick={handleNextButton}
        match={match.params.id}
        style={{ width: "100%" }}
      >
        <PinkButton name="복을 넣어주세요" />
      </footer>
    </div>
  );
}

export default LinkPage;
