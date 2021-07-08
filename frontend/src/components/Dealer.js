import {Container} from "@moosty/dao-storybook";
import React from "react";
import {Hand} from "./Hand";

export const Dealer = ({cards}) => {
  return (
    <Container className="h-1/3 flex flex-col justify-center space-y-4">
      <div className="font-medium text-24px text-yellow-300 text-center">
        Dealer
      </div>
      {cards && <Hand dealer cards={cards.length === 1 ? [cards, 52] : cards}/>}
    </Container>
  )
}
