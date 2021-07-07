import React from "react";
import {Header} from "../containers/Header";
import {useHistory} from "react-router-dom";
import {Button, ButtonGroup, Container, SimpleInput, Typography} from "@moosty/dao-storybook";
import {SliderInput} from "../components/SliderInput";
import {LotteryPriceNumbers} from "../components/LotteryPriceNumbers";

export const Lottery = ({
                          nextDrawNumber = 1,
                          nextDrawDate = "10-07-2021",
                          currentPricePot = "895",
                          ticketNumber = 500,
                          counter = "7 hrs"
                        }) => {
  const history = useHistory();

  return (<div className="w--full mx-auto space-y-8">
      <Header title="Welcome to the Lisk Lottery!"
              subTitle="Get your tickets now!"
              gradient/>

      <div className="w-app mx-auto mb-8">
        <div className="flex flex-row space-x-4 mb-8">
          <div className="flex flex-col w-1/3 space-y-4 bg-indigo-600 rounded-default py-4 px-8">

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
            <div className="flex flex-col w-full space-y-4 bg-indigo-600 rounded-default py-4 px-8">
              test
          </div>

        </div>


      </div>
    </div>
  )
}