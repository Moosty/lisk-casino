import {Hand} from "./Hand";
import React from "react";

export const Player = ({result, bet}) => {
  return (
    <>

      <div className="w-full flex-col md:flex-row flex space-x-4 space-y-4">
        <Hand bet={bet} cards={[34, 44]}/>

      </div>
    </>
  )
}
