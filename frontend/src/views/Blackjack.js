import React, {useState} from "react";
import {Button, ButtonGroup, Container, SimpleInput, Typography} from "@moosty/dao-storybook";
import {Dealer} from "../components/Dealer";
import {Player} from "../components/Player";
import {GameControl} from "../components/GameControl";
import {SliderInput} from "../components/SliderInput";
import {Alert} from "../components/Alert";
import {Table, TableTransactions} from "../components/TableTransactions";

export const Blackjack = ({}) => {

  const [bet, setBet] = useState(0)
  const [balance, setBalance] = useState(10000)
  const updateBet =(value)=>{
    setBet(bet + value)
    setBalance(balance - value)
  }


  return <div  className={"h-full"}>
    <Container  className={"flex flex-col space-y-4 "}>
      <div style={{backgroundColor: "#114602"}} className="w-app mx-auto rounded-default mt-16 p-8 space-y-8">
        <Alert success />
      <Dealer result={5}/>
      <Player bet={bet}  result={6} />
      </div>
      <div className="w-app mx-auto flex flex-col">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col w-1/4 space-y-4 bg-indigo-600 rounded-default
          p-4">
            <div className="flex flex-col space-y-2">
              <Typography type="span" className="font-medium text-white">Balance</Typography>
              <SimpleInput readOnly value={balance} description descriptionMessage="test"
                          />
            </div>
            <div className="flex flex-col space-y-2">
              <Typography type="span" className="font-medium text-white">Total Bet</Typography>
              <div className="flex flex-col">
                <SimpleInput  placeholder placeHolder={bet} description descriptionMessage="test"
                             />
                <ButtonGroup
                  className="mx-auto my-4 "
                  buttons={[
                    {label: "1", onClick:()=> updateBet(1)},
                    {label: "5", onClick:()=> updateBet(5)},
                    {label: "10", onClick:()=> updateBet(10)},
                    {label: "25", onClick:()=> updateBet(25)},
                  ]}/>
              </div>
              <div className="flex flex-row space-x-2">
              <Button className="w-full" secondary label="Deal!" />
                <Button className="w-full" onClick={() => {
                  setBalance(balance+bet)
                  setBet(0)
                }} secondary label="Clear"/>              </div>
            </div>
          </div>
          <div className="w-3/4 bg-indigo-600 p-8 rounded-default flex flex-col space-y-4">
            <TableTransactions/>

          </div>

        </div>
      </div>
    </Container>
  </div>
}