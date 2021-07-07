import React from "react";
import {Container} from "@moosty/dao-storybook";
import {Button, Typography} from "@moosty/dao-storybook";


//TODO  IK SNAP NIET WAAROM HET PLAATJE OVERAL OVERHEEN LIGT.

export const Header = ({
                                 backgroundImage,
                                 image,
                                 gradient,
                                 title,
                                 subTitle,
                                 content,
                                 titleContent,
                                 gradientClassName,
                                 buttonLabel1,
                                 onClickButton1,
                               }) => {

  return (
    <div className="relative w-app rounded-default mx-auto mt-16">
      <div className="absolute inset-0">

        <img
          className="w-full h-full object-cover"
          src={"/images/casinoabstract.jpeg"}
          alt=""
        />

        {gradient &&
        <div className={["absolute inset-0 bg-gray-600"
        ].join(" ")} style={{mixBlendMode: 'multiply'}} aria-hidden="true"/>
        }
      </div>
      <Container className={["w-app py-24 z-50"].join(" ")}>
        <div className="flex flex-col md:flex-row justify-between space-y-6">
          <div className="flex flex-col  md:w-1/2 z-40">
            <Typography className="text-themeButtonTextPrimary" type="h1" Element="h1">{title}</Typography>
            <Typography type='h3' Element="span" className="text-themeButtonTextPrimary">"{subTitle}"</Typography>
            {buttonLabel1 &&
            <div className="flex flex-row text-center  mt-6">
              <Button
                label={buttonLabel1}
                onClick={onClickButton1}
                secondary
              /></div>}
          </div>
          <div className="flex flex-col md:w-1/3 z-40">
            <Typography type='h4' Element="span" className="text-themeButtonTextPrimary">{titleContent}</Typography>
            <Typography type='bodyStrong' Element="span" className="text-themeButtonTextPrimary">{content}</Typography>
          </div>
        </div>
      </Container>
    </div>
  )
}
