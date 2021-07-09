import {Container, Typography} from "@moosty/dao-storybook";
import React from "react";

export const ProductCard = ({product, onClick, image, soon}) => {
  return (


<div onClick={onClick}
  className="relative w-full md:w-1/4 rounded-default mx-auto mt-16 rounded-default">
  <div className="absolute inset-0 rounded-default">

    <img
      className="w-full h-full object-cover"
      src={image}
      alt=""
    />


    <div className={["absolute inset-0 bg-gray-600"
    ].join(" ")} style={{mixBlendMode: 'multiply'}} aria-hidden="true"/>

  </div>
  <Container className={["w-app  z-50"].join(" ")}>
    {soon &&
    <div className="bg-green-500 py-2 px-4 rounded-default font-medium text-13px text-white text absolute top-6 right-5">COMING SOON</div>
    }
    <div className="flex flex-col md:flex-row justify-between space-y-6 py-24">
      <div className="flex flex-col  md:w-1/2 z-40">
        <Typography className="text-themeButtonTextPrimary items-center text-center" type="h1" Element="h1">{product}</Typography>

      </div>

    </div>
  </Container>
</div>


  )
}