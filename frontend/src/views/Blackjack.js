import React from "react";
import {Container} from "@moosty/dao-storybook";
import {Dealer} from "../components/Dealer";
import {Player} from "../components/Player";
import {GameControl} from "../components/GameControl";

export const Blackjack = ({}) => {

  return <div style={{backgroundColor: "#114602"}} className={"h-full"}>
    <Container className={"flex flex-col space-y-10 "}>
      <Dealer result={5}/>
      <Player result={6} />
      <GameControl/>
    </Container>
  </div>
}