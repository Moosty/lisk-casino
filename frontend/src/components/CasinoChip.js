import React from "react";

export const CasinoChip = ({value, onClick}) => {
  return (

    <div onClick={onClick}
      className="hover:opacity-75 hover:cursor-auto	 hover:shadow-md rounded-full w-10
    h-10 items-center text-center  align-middle text-white font-medium bg-blue-600">

      {value}
    </div>
  )
}

