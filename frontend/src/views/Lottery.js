import React from "react";
import {Header} from "../containers/Header";
import {useHistory} from "react-router-dom";
import {Button, ButtonGroup, Container, SimpleInput, Typography} from "@moosty/dao-storybook";
import {SliderInput} from "../components/SliderInput";

export const Lottery = ({
                          nextDrawNumber = 1,
                          nextDrawDate = "10-07-2021",
                          currentPricePot = "4.000.000",
                          ticketNumber = 500,
                          counter = "7 hrs"
                        }) => {
  const history = useHistory();

  return (<div className="w-full">
      <Header title="Welcome to the Lisk Lottery!"
              subTitle="Get your tickets now!"
              gradient/>

      <div className="m-16">
        <div className="flex flex-row ">
          <div className="flex flex-col w-1/3 space-y-4 bg-indigo-600 rounded-default p-4">

            <div className="flex flex-row space-x-4">
              <Typography type="span" type="h2"
                          className="font-bold text-pink-500">Next draw in {counter}</Typography>
            </div>
            <div className="flex flex-row space-x-4">
              <Typography type="span" className="font-medium text-white">Next draw</Typography>
              <Typography type="span"
                          className="font-medium text-yellow-300">#{nextDrawNumber} | {nextDrawDate}</Typography>
            </div>

            <div className="flex flex-row space-x-4">
              <Typography type="span" className="font-medium text-white">Price Pot</Typography>
              <Typography type="span"
                          className="font-medium text-yellow-300">{currentPricePot} LSK</Typography>
            </div>
            <div className="flex flex-row space-x-4">
              <Typography type="span" className="font-medium text-white">Your tickets</Typography>

              <Typography type="span" className="font-medium text-yellow-300">#
                {ticketNumber ? ticketNumber : " -"}
              </Typography>
            </div>
            <div className="flex flex-row space-x-4">
              <Button className="w-full" secondary label="Buy ticket"/>

            </div>

          </div>


        </div>

      </div>
    </div>
  )
}