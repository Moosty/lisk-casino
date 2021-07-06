import {Card} from "./Card";
import {Container} from "@moosty/dao-storybook";
import React from "react";
import {HandControl} from "./HandControl";

export const Hand = ({cards, double, split, dealer, result}) => {
  return (


    <Container className="w-1/2 space-x-2 space-y-4 flex flex-col items-center align-center">
      <div className="font-medium text-24px text-yellow-300 text-center">
        Raphael {result}
      </div>
      <Container className=" space-x-2  flex flex-row justify-center">
        {cards?.map(card => <Card card={card}/>
        )}
      </Container>
      {!dealer &&
      <HandControl split={split} double={double}/>
      }
    </Container>


  )
}
