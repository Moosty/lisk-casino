import {Container} from "@moosty/dao-storybook";
import * as cards from "../assets/cards";
import React from "react";
import {Card} from "./Card";
import {Hand} from "./Hand";

export const Dealer = ({result}) =>
{
  return (


<Container className="flex flex-col justify-center space-y-4">
  <div className="font-medium text-24px text-yellow-300 text-center">
    Dealer {result}
  </div>
  <Hand dealer cards={[48,52]} />
</Container>


  )
}