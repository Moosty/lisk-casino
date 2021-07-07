import React from "react";

export const LotteryPriceNumbers = ({currentPricePot, draw, totalNumbers}) => {
  return (

    <div className="flex flex-row justify-between items-center">
      <span className="text-yellow-300 font-bold text-24px   ">{totalNumbers} numbers</span>
      <span className="text-white font-medium">{currentPricePot * `${draw}`} LSK</span>
    </div>
  )
}
