import React, {useContext, useEffect, useState} from "react";
import {Header} from "../containers/Header";
import {useHistory} from "react-router-dom";
import {Button, ButtonGroup, Container, SimpleInput, Typography} from "@moosty/dao-storybook";
import {SliderInput} from "../components/SliderInput";
import {LotteryPriceNumbers} from "../components/LotteryPriceNumbers";
import {MyLotteryNumbers} from "../components/MyLotteryNumbers";
import {transactions} from "@liskhq/lisk-client";
import {AppContext} from "../appContext";
import {Buffer} from '@liskhq/lisk-client'


export const Lottery = ({
                          nextDrawNumber = 1,
                          nextDrawDate = "10-07-2021",
                          currentPricePot = "895",
                          previousPricePot= 860,
                          ticketNumber = 500,
                          counter = "7 hrs",
                          account = 30,


                        }) => {
  const history = useHistory();
  const [balance, setBalance] = useState(0)
  const [tickets, setTickets] = useState(0)
  const {getClient} = useContext(AppContext);




  const updateTickets = (value) => {
    setTickets(tickets + value)
    setBalance(balance - value * 5)
  }

  useEffect(() => {
    if (account?.chain?.token?.balance && balance === 0) {
      setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
    }
  }, [account])


  return (<div className="w--full mx-auto space-y-8">
      <Header title="Welcome to the Lisk Lottery!"
              subTitle="Get your tickets now!"
              gradient/>
      <div className="w-app mx-auto flex flex-row bg-gradient-to-r from-green-600  to-green-800 rounded-default py-2 px-4 justify-between items-center">
        <span className="font-medium text-white text-18px flex items-center ">AMAZING! You won <span className="mx-4 text-yellow-300 font-medium text-32px">766.990 LSK</span>in the lottery! </span>
        <Button label="Claim" />
      </div>

      <div className="w-app mx-auto mb-8">
        <div className="flex flex-row space-x-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
          flex flex-col w-1/3 space-y-4  rounded-default py-4 px-8">

            <div className="flex flex-row space-x-4 text-24px">
              <Typography type="span" type="span"
                          className="font-bold text-white">Next draw in {counter}</Typography>
            </div>
            <div className="flex flex-row space-x-4">
              <Typography type="span" className="font-medium text-white">Next draw</Typography>
              <Typography type="span"
                          className="font-medium text-yellow-300">#{nextDrawNumber} | {nextDrawDate}</Typography>
            </div>

            <div className="flex flex-row space-x-4">
              <Typography type="span" className="font-medium text-white">Total Price Pot</Typography>
              <Typography type="span"
                          className="font-medium text-yellow-300">{currentPricePot} LSK</Typography>
            </div>
<div className="flex flex-col">
<LotteryPriceNumbers currentPricePot={currentPricePot} draw={0.5} totalNumbers={4} />
<LotteryPriceNumbers currentPricePot={currentPricePot} draw={0.3} totalNumbers={3} />
<LotteryPriceNumbers currentPricePot={currentPricePot} draw={0.1} totalNumbers={2} />

</div>


          </div>

          {/*LAST DRAW*/}
          <div className="bg-gradient-to-r from-indigo-600  to-indigo-800
          flex flex-col w-1/3 space-y-4  rounded-default py-4 px-8">

            <div className="flex flex-row space-x-4 text-24px">
              <Typography type="span" type="span"
                          className="font-bold text-white">Round #{nextDrawNumber} | {nextDrawDate}</Typography>
            </div>
            <div className="flex flex-col space-y-4">
              <span className="font-medium text-white">Winning Numbers:</span>
              <div className="flex flex-row space-x-4">
                <MyLotteryNumbers />


              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-white">Total Pricepool:</span>
                <span className="text-yellow-300 font-bold text-32px">{previousPricePot}</span>

            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col space-y-4">
                  <span className="font-medium text-white ">No. Matched</span>
                  <span className="text-yellow-300 font-bold text-24px">4</span>
                  <span className="text-yellow-300 font-bold text-24px">3</span>
                  <span className="text-yellow-300 font-bold text-24px">2</span>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="font-medium text-white  ">Winners</span>
                  <span className="font-medium text-white text-24px">4</span>
                  <span className="font-medium text-white text-24px">12</span>
                  <span className="font-medium text-white text-24px">35</span>
                </div>
                <div className="flex flex-col space-y-4 text-right">
                  <span className="font-medium text-white ">Prize Pool</span>
                  <span className="font-medium text-white text-24px ">{previousPricePot * 0.5} LSK</span>
                  <span className="font-medium text-white text-24px">{previousPricePot * 0.3}  LSK</span>
                  <span className="font-medium text-white text-24px">{previousPricePot * 0.1}  LSK</span>
                </div>

              </div>
            </div>



          </div>
            <div className="bg-gradient-to-r from-indigo-600  to-black
            flex flex-col w-1/3 space-y-4   rounded-default py-4 px-8">
              <div className="flex flex-col text-24px">
                <Typography type="span" type="span"
                            className="font-bold text-white mb-4">Your Tickets</Typography>
                <div className="flex flex-col space-y-4">
                  <MyLotteryNumbers />
                  <MyLotteryNumbers />
                  <MyLotteryNumbers />
                </div>
              </div>
          </div>
          <div className="w-1/4 mx-auto flex flex-col">
            <div className="flex w-full flex-row space-x-4">
              <div className="flex w-full flex-col  space-y-4 bg-gradient-to-r from-indigo-600  to-indigo-800 rounded-default
          p-4">
                <div className="flex flex-col space-y-2">
                  <Typography type="span" className="font-medium text-white">Balance</Typography>
                  <SimpleInput readOnly value={balance} description descriptionMessage="test"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Typography type="span" className="font-medium text-white">Total Tickets</Typography>
                  <div className="flex flex-col">
                    <SimpleInput readOnly placeholder placeHolder={tickets} description descriptionMessage="test"/>
                    <ButtonGroup
                      className="mx-auto my-4 "
                      buttons={[
                        {label: "1", onClick: () => updateTickets(1)},
                        {label: "5", onClick: () =>  updateTickets(5)},
                        {label: "10", onClick: () =>  updateTickets(10)},
                        {label: "25", onClick: () => updateTickets(25)},
                      ]}/>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Typography type="span" className="font-medium text-white">Total Cost</Typography>
                    <SimpleInput readOnly value={tickets * 5} description descriptionMessage="test"
                    />
                </div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <Button className="w-full" secondary label="Buy Tickets" />
                    <Button className="w-full" onClick={() => {
                      setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
                      setTickets(0)
                    }} secondary label="Clear"/>
                    </div>
                </div>
              </div>
              {/*<div className="w-3/4 bg-gradient-to-r from-indigo-600  to-indigo-800 p-8 rounded-default flex flex-col space-y-4">*/}
              {/*  <TableTransactions/>*/}
              {/*</div>*/}
            </div>
          </div>

        </div>


    </div>
  )
}