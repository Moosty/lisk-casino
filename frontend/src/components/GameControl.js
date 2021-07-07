import React, {useState} from "react";
import {Container, Button} from "@moosty/dao-storybook";
import {CasinoChip} from "./CasinoChip";


export const GameControl = ({bet, setBet, balance, setBalance}) => {



  const updateBet =(value)=>{
    setBet(bet + value)
    setBalance(balance - value)
  }

  return (
    <div className="flex flex-col w-full space-y-4">

    <Container className="flex flex-row space-x-8 justify-center">

<div className="flex flex-row space-x-2">
 <CasinoChip value={1} onClick={( )=>updateBet(1)} />
 <CasinoChip value={5}  onClick={( )=>updateBet(5)} />
 <CasinoChip value={10}  onClick={( )=>updateBet(10)} />
 <CasinoChip value={25}  onClick={( )=>updateBet(25)} />
 <CasinoChip value={50}  onClick={( )=>updateBet(50)} />
</div>
      <div className="flex flex-row space-x-2">
        <Button secondary  label="Deal"/>
        <Button onClick={() => {
          setBalance(balance+bet)
          setBet(0)
        }} secondary label="Clear"/>
      </div>


    </Container>
      <div className="bg-surfaceBg w-1/6 justify-center mx-auto flex rounded py-2">
        <span className="font-medium mr-4">Balance:</span> {balance}</div>
    </div>
  )
}