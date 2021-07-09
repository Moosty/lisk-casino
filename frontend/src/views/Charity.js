/* global BigInt */
import React, {useContext, useEffect, useState} from "react";
import {useBlocks} from "../hooks/blocks";
import {AppContext} from "../appContext";
import {Button, Container, Typography} from "@moosty/dao-storybook";
import {Header} from "../containers/Header";
import {transactions} from '@liskhq/lisk-client'

export const Charity = () => {
  const {getClient} = useContext(AppContext);
  const {height,} = useBlocks();
  const [charityBalance, setCharityBalance] = useState(0)
  useEffect(() => {
    const getCharity = async () => {
      const client = await getClient;
      const charityAccountBuffer = await client.invoke('app:getAccount', {address: Buffer.from("92668567a645cdac2cee05158a804bf0266229bb", 'hex')})
      const charityAccount = await client.account.decode(charityAccountBuffer)
      setCharityBalance(parseFloat(transactions.convertBeddowsToLSK(charityAccount.token.balance.toString())).toFixed(2))
    }
    getCharity()
  }, [height])

  return (
    <>
      <Header
        title="The Charity fund!"
        subTitle="supporting worldwide initiatives, decided by our users"
        backgroundImage="/images/casinoabstract.jpeg"

        gradient/>
      <div
        className="w-app mt-4 mx-auto flex flex-col md:flex-row bg-gradient-to-r from-green-400  to-green-500 rounded-default py-2 px-4 justify-between items-center">
        <span className="font-medium text-white text-18px flex items-center ">AMAZING! the charity fund now has <span
          className="mx-4 text-yellow-300 font-medium text-32px">{charityBalance} LSK</span></span>
        <Button label="Vote"/>
      </div>
      <Container
        className={["flex flex-col lg:flex-row justify-between bg-white mt-4 rounded py-4 space-x-20  md:w-app "].join(" ")}>
        <div className="flex flex-col w-1/2 ">
          <Typography type="h1" Element="h1">What is it?</Typography>
          <Typography type="body" Element="span">The Charity Fund is meant to support small scale charity projects every
            month. The fund distributes an x amount of the profits of the Casino to a social good.
          </Typography>
        </div>
        <div className="flex flex-col  w-1/2 ">
          <Typography type="h1" Element="h1">How does it work?</Typography>
          <Typography type="body" Element="span">Every time someone in the casino loses a bet, 10% of the profit of the
            casino is set apart into a specific fund, which is aimed at supporting charities. With this part of our
            profit we'd like to stimulate a wide range of projects.
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
            <div className={["absolute inset-0 bg-gray-600 cursor-pointer"].join(" ")}
                 style={{mixBlendMode: 'multiply'}} aria-hidden="true"/>
          </div>
          <Container className={["w-app  z-50"].join(" ")}>
            <div
              className="bg-green-500 py-2 px-4 rounded-default font-medium text-13px text-white text absolute top-6 right-5">
              COMING SOON
            </div>
            <div className="flex flex-col md:flex-row justify-between space-y-6 py-24">
              <div className="flex flex-col  md:w-1/2 z-40 cursor-pointer">
                <Typography
                  className="text-themeButtonTextPrimary items-center text-center"
                  type="h1"
                  Element="h1">project</Typography>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>)
}
