/* global BigInt */
import React, {useContext, useEffect} from "react";
import {useBlocks} from "../hooks/blocks";
import {useHistory} from "react-router-dom";
import {useProjects} from "../hooks/projects";
import {AppContext} from "../appContext";
import {ButtonGroup, Container, SimpleInput} from "@moosty/dao-storybook";
import {Typography} from "@moosty/dao-storybook";
import {Button} from "@moosty/dao-storybook";
import {RocketSvg} from "@moosty/dao-storybook";
import {BlogSection} from "@moosty/dao-storybook";
import {blogs} from "../fixtures/blogs";
import {HeroContainer} from "../containers/Hero";
import {Header} from "../containers/Header";
import {LotteryPriceNumbers} from "../components/LotteryPriceNumbers";
import {MyLotteryNumbers} from "../components/MyLotteryNumbers";
import {transactions} from "@liskhq/lisk-client";

export const Home = ({account, setModal, filters, visible, userName, hands}) => {
  const history = useHistory()
  const {getClient} = useContext(AppContext);
  const {projects} = useProjects();
  const {height,} = useBlocks();

  return (
    <>
   <Header title="Welcome to the Lisk Casino!"
           subTitle="Where all your dreams become reality"
           buttonLabel1="Play Blackjack!"
           onClickButton1={() => history.push('/blackjack')}
           gradient/>


      <div className="w-app mt-8 mx-auto mb-8">
        <div className="flex flex-row space-x-4 mb-8 ">
          <div onClick={()=> history.push('/roulette')}  className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
                      cursor-pointer text-white hover:text-yellow-300
          flex flex-col w-1/3 space-y-4  rounded-default py-12  px-8">
            <div className="flex flex-row space-x-4 text-24px mx-auto">
              <Typography type="span" type="span"
                          className="font-bold">Roulette</Typography>
            </div>
          </div>
          <div onClick={()=> history.push('/dices')}  className="bg-gradient-to-r from-indigo-600  to-black
            cursor-pointer text-white hover:text-yellow-300
            flex flex-col w-1/3 space-y-4   rounded-default py-12  px-8">
            <div className="flex flex-col text-24px mx-auto">
              <Typography type="span" type="span"
                          className="font-bold  mb-4">Dices</Typography>
            </div>
          </div>
          <div onClick={()=> history.push('/blackjack')}  className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
          cursor-pointer text-white hover:text-yellow-300
          flex flex-col w-1/3 space-y-4  rounded-default py-12  px-8">
            <div className="flex flex-row space-x-4 text-24px  mx-auto">
              <Typography type="span" type="span"
                          className="font-bold ">Blackjack</Typography>
            </div>
          </div>
          <div onClick={()=> history.push('/lottery')} className="cursor-pointer  text-white hover:text-yellow-300 bg-gradient-to-r from-indigo-600  to-black
            flex flex-col w-1/3 space-y-4   rounded-default py-12 px-8 ">
            <div className="flex flex-col text-24px  mx-auto">
              <Typography type="span" type="span"
                          className="font-bold mb-4  ">Lottery</Typography>
            </div>
          </div>

        </div>

      </div>
    <Container
      className={["flex flex-col lg:flex-row justify-between my-16 space-x-20  md:w-app "].join(" ")}>
      <div className="flex flex-col w-1/2  mb-4">
        <Typography type="h1" Element="h1">Lisk Casino</Typography>
        <Typography type="body" Element="span">Here you can play the games you like, instant betting and earning. Here you can play the games you like, instant betting and earning. A tamper free place to play all the games you can play at the physical casino, but without revealing your identity. Fully online. For your fun. A place for fun & luck.
        </Typography>
      </div>
      <div className="flex flex-col  w-1/2 ">
        <Typography type="h1" Element="h1">The Moosty Team</Typography>
        <Typography type="body" Element="span">Lisk Casino is brought to you by <a
          href="https://moosty.com/contact" target="_blank" rel="noopener noreferrer">Moosty</a> (Jurre, Raphael,
          Sander). With different backgrounds, skillsets and experience we are on a journey to reinvent how organisations
          work, how musicians create and distribute content and play around with concepts like an online casino. You'll never know where it ends.
          <a href="https://moosty.com/contact" target="_blank" rel="noopener noreferrer" className="">
            {` `}Reach out to us!
          </a></Typography>
      </div>
    </Container>

    </>)
}