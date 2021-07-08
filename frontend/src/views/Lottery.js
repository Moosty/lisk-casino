import React, {useState} from "react";
import {Header} from "../containers/Header";
import {useHistory} from "react-router-dom";
import {Button, ButtonGroup, Container, SimpleInput, Typography} from "@moosty/dao-storybook";
import {SliderInput} from "../components/SliderInput";
import {LotteryPriceNumbers} from "../components/LotteryPriceNumbers";
import {MyLotteryNumbers} from "../components/MyLotteryNumbers";
import {transactions} from "@liskhq/lisk-client";

export const Lottery = ({
                          nextDrawNumber = 1,
                          nextDrawDate = "10-07-2021",
                          currentPricePot = "895",
                          ticketNumber = 500,
                          counter = "7 hrs",

                        }) => {
  const history = useHistory();
  const [balance, setBalance] = useState(0)


  const [tickets, setTickets] = useState(0)

  return (<div className="w--full mx-auto space-y-8">
      <Header title="Welcome to the Lisk Lottery!"
              subTitle="Get your tickets now!"
              gradient/>

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
                    <SimpleInput readOnly placeholder placeHolder={10} description descriptionMessage="test"/>
                    <ButtonGroup
                      className="mx-auto my-4 "
                      buttons={[
                        {label: "1", onClick: () => (1)},
                        {label: "5", onClick: () => (5)},
                        {label: "10", onClick: () => (10)},
                        {label: "25", onClick: () => (25)},
                      ]}/>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Typography type="span" className="font-medium text-white">Total Cost</Typography>
                    <SimpleInput readOnly value={balance} description descriptionMessage="test"
                    />
                  </div>
                  <div className="flex flex-row space-x-2">
                    <Button className="w-full" secondary label="Buy Tickets" />
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
    </div>
  )
}