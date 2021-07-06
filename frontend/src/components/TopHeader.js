import React from 'react'
import { XIcon } from '@heroicons/react/outline'

export const TopHeader = () => {
  return (
    <div className="relative bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="">AWESOME! Current jackpot is...</span>
            <span className="block sm:ml-2 sm:inline-block text-yellow-300 font-bold">
               450.877 LSK

            </span>
          </p>
        </div>

      </div>
    </div>
  )
}
