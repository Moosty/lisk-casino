import React from "react";
import {Header} from "../containers/Header";
import {useHistory} from "react-router-dom";

export const Roulette = ({}) => {
  const history = useHistory();

  return (<div>
      <Header title="Welcome to the Lisk Roulette!"
              subTitle="coming soon to a place near you"
              buttonLabel1="Start blackjack now!"
              backgroundImage="/images/roulette.jpeg"

              onClickButton1={() => history.push('/blackjack')}
              gradient/>

    </div>
  )
}