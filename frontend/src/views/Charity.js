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

export const Charity = ({account, setModal, filters, visible, userName, hands}) => {
  const history = useHistory()
  const {getClient} = useContext(AppContext);
  const {projects} = useProjects();
  const {height,} = useBlocks();

  return (
    <>
      <Header title="The Charity fund!"
              subTitle="supporting worldwide initiatives, decided by our users"
              gradient/>
      <Container
        className={["flex flex-col lg:flex-row justify-between bg-white mt-8 rounded py-4 space-x-20  md:w-app "].join(" ")}>
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
      <div className="w-app  ">
        <div className="flex flex-col md:flex-row md:space-x-4 md:mb-8 ">
          <ProductCard product="AProject" soon image={"https://cdn.pixabay.com/photo/2016/07/11/22/06/we-1510788_1280.jpg"}
                       onClick={() => history.push('/roulette')}/>
          <ProductCard product="BrProject" soon image={"https://pixnio.com/free-images/people/male-men/drought-affects-health-and-farming-madagascar-725x485.jpg"} onClick={() => history.push('/blackjack')}/>
          {/*END*/}
        </div>
      </div>


    </>)
}