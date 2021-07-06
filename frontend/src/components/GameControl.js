import React from "react";
import {Container, Button} from "@moosty/dao-storybook";
import {CasinoChip} from "./CasinoChip";

export const GameControl = ({}) => {
  return (
    <div className="flex flex-col w-1/2">
      <div className="bg-surfaceBg w-1/6 justify-center mx-auto flex rounded py-2">
        <span className="font-medium mr-4">Bet</span> 899</div>
    <Container className="flex flex-row space-x-4 justify-center">

<div className="flex flex-row">
 <CasinoChip value={1} />
 <CasinoChip value={5} />
 <CasinoChip value={10} />
 <CasinoChip value={25} />
 <CasinoChip value={50} />
</div>
      <div className="flex flex-row">
        <Button secondary  label="Deal"/>
        <Button secondary label="Clear"/>
      </div>


    </Container>
    </div>
  )
}