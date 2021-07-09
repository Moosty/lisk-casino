import React, {useContext, useEffect, useState} from 'react'
import {InformationCircleIcon} from '@heroicons/react/outline'
import {useHistory} from "react-router-dom";
import {IconButton} from "@moosty/dao-storybook";
import {AppContext} from "../appContext";
import {useBlocks} from "../hooks/blocks";
import {transactions} from "@liskhq/lisk-client";

export const TopHeader = () => {
  const history = useHistory()
  const {getClient} = useContext(AppContext);
  const {height,} = useBlocks();
  const [jackpot, setJackpot] = useState(0)
  useEffect(() => {
    const getCharity = async () => {
      const client = await getClient;
      const jackpot = await client.invoke('poker:getJackpot')
      if (jackpot?.jackpot) {
        setJackpot(jackpot.jackpot)
      }
    }
    getCharity()
  }, [height])
  return (
    <div className="relative bg-gradient-to-r from-green-400  to-green-500">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-gray-900">
            <span className="">AWESOME! Current jackpot is...</span>
            <span className="block sm:ml-2 sm:inline-block text-yellow-300 font-bold">
               {parseFloat(transactions.convertBeddowsToLSK(jackpot.toString())).toFixed(0)} LSK
            </span>
            <span onClick={() => history.push('/lottery')}
                  className="cursor-pointer underline block sm:ml-2 sm:inline-block text-yellow-600 font-bold">

            </span>
          </p>
        </div>


      </div>
    </div>
  )
}


