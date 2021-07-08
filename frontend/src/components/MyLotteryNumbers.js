import React from "react";
const colors = [
  'bg-yellow-500',
  'bg-green-500',
  'bg-pink-500',
  'bg-blue-500',
]
export const MyLotteryNumbers = ({numbers}) => {
  return (
    <div className="flex flex-row space-x-4">
      {numbers && numbers.map((num, i) => <span className={`text-white font-medium flex h-10 w-10 items-center text-center justify-center rounded-default ${colors[i]}`}>{num}</span>)}
    </div>
  )
}
