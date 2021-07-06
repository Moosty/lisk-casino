import {Card} from "./Card";
import {Container} from "@moosty/dao-storybook";
import React from "react";
import {HandControl} from "./HandControl";

export const Hand = ({cards, double, split, dealer}) => {
  return (


    <Container className="w-1/3 space-x-2 space-y-4 flex flex-col items-center align-center">
      <Container className=" space-x-2  w-1/3 flex flex-row justify-center">

        {cards?.map(card => <Card card={card}/>
        )}

      </Container>
      {!dealer &&
      <HandControl split={split} double={double}/>
      }
    </Container>


  )
}
