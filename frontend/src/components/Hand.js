import {Card} from "./Card";
import {Container} from "@moosty/dao-storybook";
import React from "react";
import {HandControl} from "./HandControl";

export const Hand = ({cards, double, bet, split, dealer, result}) => {
  return (


    <Container className="w-1/2 space-x-2 space-y-4 flex flex-col items-center align-center">
      {!dealer && <div className="font-medium text-24px text-yellow-300 text-center">
        Raphael {result}
      </div>
      }
      <Container className=" space-x-2  flex flex-row justify-center">
        {cards?.map(card => <Card card={card}/>
        )}
      </Container>
      {!dealer &&
      <>
        <div className="bg-surfaceBg w-1/6 justify-center mx-auto flex rounded py-2">
          <span className="font-medium mr-4">Bet</span>{bet}
        </div>
        <HandControl split={split} double={double}/>
      </>
      }
    </Container>


  )
}
