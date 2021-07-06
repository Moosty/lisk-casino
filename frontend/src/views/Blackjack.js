import React, {useState} from "react";
import {Container} from "@moosty/dao-storybook";
import {Dealer} from "../components/Dealer";
import {Player} from "../components/Player";
import {GameControl} from "../components/GameControl";

export const Blackjack = ({}) => {

  const [bet, setBet] = useState(0)
  const [balance, setBalance] = useState(10000)

  return <div style={{backgroundColor: "#114602"}} className={"h-full"}>
    <Container className={"flex flex-col space-y-10 "}>
      <Dealer result={5}/>
      <Player bet={bet}  result={6} />
      <GameControl bet={bet} setBet={setBet} balance={balance} setBalance={setBalance} />
    </Container>
  </div>
}