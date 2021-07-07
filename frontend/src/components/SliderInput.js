import React from "react";

export const SliderInput = ({value}) => {
  return (


<>

<div className="flex  w-full m-auto items-center h-32 justify-center">
  <div className="py-1 relative min-w-full">
    <div className="h-2 bg-yellow-300 rounded-full">
      <div className="absolute h-2 rounded-full bg-teal-600 w-0" style={{width: "58.5714%"}}></div>
      <div className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer" unselectable="on" onselectstart="return false;" style={{left: "58.5714%"}}>
        <div className="relative -mt-2 w-1">
          <div className="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full" style={{marginLeft:"-20.5px"}}>
            <div className="relative shadow-md">
              <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">{value}</div>
              <svg className="absolute text-black w-full h-2 left-0 top-100" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                                <polygon className="fill-current" points="0,0 127.5,127.5 255,0"></polygon>
                            </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute font-medium text-white -ml-1 bottom-0 left-0 -mb-6">0</div>
      <div className="absolute font-medium text-white -mr-1 bottom-0 right-0 -mb-6">99</div>
    </div>
  </div>
</div>


</>
)
}