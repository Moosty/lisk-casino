import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../appContext";
const colors = [
  'bg-yellow-500',
  'bg-green-500',
  'bg-pink-500',
  'bg-blue-500',
]
export const MyLotteryNumbers = ({ticket, won, currentRound, round, numbers}) => {
  const {getClient} = useContext(AppContext);
  const [winningRound, setWinningRound] = useState()

  useEffect(() => {
    const getRound = async (round) => {
      const client = await getClient;
      setWinningRound(await client.invoke('lottery:getRound', {round}))
    }
    if (won?.length > 0 && won.find(w => w.id === ticket.id)) {
      getRound(ticket.round)
    }
  }, [won])

  return (
    <div className="flex flex-row space-x-4">
      {ticket && ticket?.numbers.map((num, i) => <span className={`text-white font-medium flex h-10 w-10 items-center text-center justify-center rounded-default ${colors[i]}`}>{num}</span>)}
      {!ticket && numbers && numbers.map((num, i) => <span className={`text-white font-medium flex h-10 w-10 items-center text-center justify-center rounded-default ${colors[i]}`}>{num}</span>)}
    </div>
  )
}
