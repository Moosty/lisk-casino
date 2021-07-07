import React from "react";
import {Header} from "../containers/Header";
import {useHistory} from "react-router-dom";

export const Lottery = ({}) => {
  const history = useHistory();

  return (<div>
      <Header title="Welcome to the Lisk Lottery!"
              subTitle="raph fixes the layout"
              buttonLabel1="Do it! Do it NOW!!"
              onClickButton1={() => history.push('/blackjack')}
              gradient/>

    </div>
  )
}