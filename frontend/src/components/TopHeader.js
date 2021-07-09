import React from 'react'
import {InformationCircleIcon} from '@heroicons/react/outline'
import {useHistory} from "react-router-dom";
import {IconButton} from "@moosty/dao-storybook";

export const TopHeader = ({jackpotFundNumber = 450.877}) => {
  const history = useHistory()

  return (
    <div className="relative bg-gradient-to-r from-green-400  to-green-500">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-gray-900">
            <span className="">AWESOME! Current jackpot is...</span>
            <span className="block sm:ml-2 sm:inline-block text-yellow-300 font-bold">
               {jackpotFundNumber} LSK
            </span>
            <span onClick={() => history.push('/lottery')}
                  className="cursor-pointer underline block sm:ml-2 sm:inline-block text-yellow-600 font-bold">

            </span>
            <IconButton className="h-5 w-5 text-black" >
              <InformationCircleIcon /></IconButton>
          </p>
        </div>


      </div>
    </div>
  )
}


