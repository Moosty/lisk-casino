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

export const Charity = ({account, setModal, filters, visible, userName, hands, charityFundAmount = 500}) => {
  const history = useHistory()
  const {getClient} = useContext(AppContext);
  const {projects} = useProjects();
  const {height,} = useBlocks();

  return (
    <>
      <Header title="The Charity fund!"
              subTitle="supporting worldwide initiatives, decided by our users"
              gradient/>
      <div
        className="w-app mt-4 mx-auto flex flex-col md:flex-row bg-gradient-to-r from-green-400  to-green-500 rounded-default py-2 px-4 justify-between items-center">
        <span className="font-medium text-white text-18px flex items-center ">AMAZING! the charity fund now has <span
          className="mx-4 text-yellow-300 font-medium text-32px">{charityFundAmount} LSK</span></span>
        <Button label="Vote"/>
      </div>
      <Container
        className={["flex flex-col lg:flex-row justify-between bg-white mt-4 rounded py-4 space-x-20  md:w-app "].join(" ")}>
        <div className="flex flex-col w-1/2 ">
          <Typography type="h1" Element="h1">What is it?</Typography>
          <Typography type="body" Element="span">The Charity Fund is meant to support small scale charity projects every month. The fund distributes an x amount of the profits of the Casino to a social good.
          </Typography>
        </div>
        <div className="flex flex-col  w-1/2 ">
          <Typography type="h1" Element="h1">How does it work?</Typography>
          <Typography type="body" Element="span">Every time someone in the casino loses a bet, 10% of the profit of the casino is set apart into a specific fund, which is aimed at supporting charities. With this part of our profit we'd like to stimulate a wide range of projects.
            Casino visitors can all cast a vote on the beneficial projects.
             </Typography>
        </div>
      </Container>
      <div className="w-app mb-4 hover:cursor-pointer">
        <div
             className="hover:cursor-pointer	rounded group-hover:text-opacity-80 relative w-full md:w-1/4 rounded-default mx-auto mt-16 rounded-default">
          <div className="absolute inset-0 rounded-default">
            <img
              className="w-full h-full object-cover"
              src="https://pixnio.com/free-images/people/male-men/drought-affects-health-and-farming-madagascar-725x485.jpg"
              alt=""
            />
            <div className={["absolute inset-0 bg-gray-600"
            ].join(" ")} style={{mixBlendMode: 'multiply'}} aria-hidden="true"/>
          </div>
          <Container className={["w-app  z-50"].join(" ")}>
            <div className="bg-green-500 py-2 px-4 rounded-default font-medium text-13px text-white text absolute top-6 right-5">COMING SOON</div>
            <div className="flex flex-col md:flex-row justify-between space-y-6 py-24">
              <div className="flex flex-col  md:w-1/2 z-40">
                <Typography className="text-themeButtonTextPrimary items-center text-center" type="h1" Element="h1">project</Typography>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>)
}