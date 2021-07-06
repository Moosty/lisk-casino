import React from "react";
import {Container, Button} from "@moosty/dao-storybook";
import {CasinoChip} from "./CasinoChip";

export const GameControl = ({}) => {
  return (
    <Container className="flex flex-row space-x-4 items-center">

<div className="flex flex-row">
 <CasinoChip value={40} />
</div>
      <div className="flex flex-row">
        <Button label="Deal"/>
        <Button label="Clear"/>
      </div>


    </Container>
  )
}