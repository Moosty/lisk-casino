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
import {ProductCard} from "../components/ProductCard";

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


      <div className="w-app  mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:space-x-4 mb-8 ">
<ProductCard product="Roulette" soon image={"/images/roulette.jpeg"} onClick={()=> history.push('/roulette')} />
<ProductCard product="BlackJack" image={"/images/blackjack.jpeg"} onClick={()=> history.push('/blackjack')} />
<ProductCard product="Dices" soon image={"/images/dices.jpeg"} onClick={()=> history.push('/dices')} />
<ProductCard product="Lottery" image={"/images/lottery.jpeg"} onClick={()=> history.push('/lottery')} />
          {/*END*/}





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