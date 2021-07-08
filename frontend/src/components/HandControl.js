import React from "react";
import {Button, Container} from "@moosty/dao-storybook";
import {blackjackDeck} from "../utils/common";

export const HandControl = ({onHit, onStand, onSplit, onDouble, hand}) => {
  return (
    <Container className="justify-center flex w-full flex-row space-x-4 items-center">
      {hand.state === 'undecided' && <>
        {!hand.double && !hand.count < 21 && <Button onClick={() => onHit(hand.id)} label="Hit"/>}
        {!hand.double && !hand.count < 21 && <Button onClick={() => onStand(hand.id)} label="Stand"/>}
        {!hand.double && hand.cards.length === 2 && blackjackDeck[hand.cards[0]] === blackjackDeck[hand.cards[1]] && <Button onClick={() => onSplit(hand.id)} label="Split"/>}
        {!hand.double && !hand.count < 21 && <Button onClick={() => onDouble(hand.id)} label="Double"/>}
      </>}
    </Container>
  )
}
