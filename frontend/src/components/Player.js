import {Hand} from "./Hand";
import React from "react";

export const Player = ({result, bet, hands, onHit, onStand, onSplit, onDouble}) => {

  return (
    <>
      <div className="w-full flex-col md:flex-row flex space-x-4 space-y-4 ">
        {hands && hands.map(hand => <Hand
          onStand={onStand}
          onHit={onHit}
          onSplit={onSplit}
          onDouble={onDouble}
          hand={hand}
          bet={bet}
          cards={hand.cards}
        />)}
      </div>
    </>
  )
}
