import React, {useState} from "react";
import {Alert} from "../components/Alert";
import {Container, SimpleInput, Typography, ButtonGroup, Button} from "@moosty/dao-storybook";
import {SliderInput} from "../components/SliderInput";
import Slider from 'react-input-slider';



export const Dices = ({}) => {

  const [number, setNumber] = useState(10);

  return (<div className="m-16">
      <Container className="w-full flex flex-col">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col w-1/3 space-y-4 bg-gradient-to-r from-indigo-600  to-indigo-800 rounded-default
          p-4">
            <div className="flex flex-col space-y-2">
              <Typography type="span" className="font-medium text-white">Roll Over</Typography>
              <SimpleInput readOnly value={number} description descriptionMessage="test"
                           label={"datepicker mockup"}/>
            </div>
            <div className="flex flex-col space-y-2">
              <Typography type="span" className="font-medium text-white">Bet Amount</Typography>
              <div className="flex flex-col">
                <SimpleInput  placeholder placeHolder={"1lsk"} description descriptionMessage="test"
                             label={"datepicker mockup"}/>
                <ButtonGroup
                  className="mx-auto my-4 "
                  buttons={[
                    {label: "1/2"},
                    {label: "x2"},
                    {label: "Min"},
                    {label: "Max"},
                  ]}/>
              </div>
<Button className="w-full" secondary label="Roll!" />
            </div>
          </div>
          <div className="w-2/3 bg-gradient-to-r from-indigo-600 justify-between  to-indigo-800 p-8 rounded-default flex flex-col space-y-4">
            <Slider
              axis="x"
              x={number}
              onChange={(e) => {
setNumber(e.x >= 96 ? 96 : e.x <= 4 ? 4 : e.x)              }}
              styles={{
                track: {
                  backgroundColor: 'white',
                  width: '100%'
                },
                active: {
                  backgroundColor: 'yellow'
                },
                thumb: {
                  width: 20,
                  height: 20
                },
                disabled: {
                  opacity: 0.5
                }
              }}
            />            <div className="flex flex-row space-x-4 justify-around">
              <div className="flex flex-col items-center">
                <span className="align-centers font-medium text-white opacity-90">Win Chance</span>
                <span className="align-centers font-medium  text-24px text-white ">{number}%</span>
              </div><div className="flex flex-col items-center">
                <span className="align-centers font-medium text-white opacity-90">Payout</span>
                <span className="align-centers font-medium  text-24px text-white ">2x</span>
              </div><div className="flex flex-col items-center">
                <span className="align-centers font-medium text-white opacity-90">Profit on win</span>
                <span className="align-centers font-medium  text-24px text-white ">578LSK</span>
              </div>
            </div>
          </div>

        </div>
      </Container>

    </div>
  )
}