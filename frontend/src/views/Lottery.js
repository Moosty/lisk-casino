/* global BigInt */
import React, {useContext, useEffect, useState} from "react";
import {Header} from "../containers/Header";
import {Button, ButtonGroup, SimpleInput, Typography} from "@moosty/dao-storybook";
import {LotteryPriceNumbers} from "../components/LotteryPriceNumbers";
import {MyLotteryNumbers} from "../components/MyLotteryNumbers";
import {Buffer, transactions} from "@liskhq/lisk-client";
import {AppContext} from "../appContext";
import {createTransaction} from "../utils/transactions";

export const Lottery = ({account,}) => {
  const [balance, setBalance] = useState(0)
  const [tickets, setTickets] = useState(null)
  const [buyDisabled, setDisableBuy] = useState(false)
  const [activeTickets, setActiveTickets] = useState([])
  const [activePrizes, setActivePrizes] = useState([])
  const [height, setHeight] = useState(null)
  const [round, setRound] = useState(null)
  const [previousRound, setPreviousRound] = useState(null)
  const {getClient} = useContext(AppContext);

  const updateTickets = (value) => {
    setTickets(tickets + value)
    setBalance(account && parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())) - value * 5)
  }

  const buyTickets = async () => {
    const client = await getClient
    try {
      setDisableBuy(true)
      const result = await createTransaction({
        moduleId: 8892,
        assetId: 0,
        assets: {
          quantity: tickets
        },
        account,
        client,
      })
      if (result.status) {
        const findTransaction = async () => {
          try {
            await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
            setDisableBuy(false)
            setTickets(0)
            setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
          } catch (e) {
            setTimeout(async () => await findTransaction(), 1000)
          }
        }
        await findTransaction()
      } else {
        setTickets(0)
        setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
        setDisableBuy(false)
      }
    } catch (e) {
      setTickets(0)
      setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
      setDisableBuy(false)
    }
  }

  const getUserActiveTickets = async (tickets) => {
    const client = await getClient;
    const detailedTickets = []
    for (let i = 0; i < tickets.length; i++) {
      detailedTickets.push(await client.invoke('lottery:getTicketById', {id: tickets[i].toString('hex')}))
    }
    if (detailedTickets.length > 0) {
      setActiveTickets(detailedTickets)
    } else {
      setActiveTickets([])
    }
  }

  const getUserPriceTickets = async (tickets) => {
    const client = await getClient;
    const priceTickets = []
    for (let i = 0; i < tickets.length; i++) {
      priceTickets.push(await client.invoke('lottery:getTicketById', {id: tickets[i].toString('hex')}))
    }
    if (priceTickets.length > 0) {
      setActivePrizes(priceTickets)
    } else {
      setActivePrizes([])
    }
  }

  const onClaim = async () => {
    const client = await getClient
    try {
      setDisableBuy(true)
      const result = await createTransaction({
        moduleId: 8892,
        assetId: 1,
        assets: {
          claim: true
        },
        account,
        client,
      })
      if (result.status) {
        const findTransaction = async () => {
          try {
            await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
            setDisableBuy(false)
            setTickets(0)
            setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
          } catch (e) {
            setTimeout(async () => await findTransaction(), 1000)
          }
        }
        await findTransaction()
      } else {
        setTickets(0)
        setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
        setDisableBuy(false)
      }
    } catch (e) {
      setTickets(0)
      setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
      setDisableBuy(false)
    }
  }

  useEffect(() => {
    if (account?.chain?.lottery?.tickets) {
      getUserActiveTickets(account?.chain?.lottery?.tickets)
    }
    if (account?.chain?.lottery?.prizes) {
      getUserPriceTickets(account?.chain?.lottery?.prizes)
    }
  }, [account])

  useEffect(() => {
    const getLotteryData = async () => {
      const client = await getClient
      const nodeInfo = await client.invoke("app:getNodeInfo")
      setRound(await client.invoke("lottery:getRound", {round: Math.floor(nodeInfo.height / 100)}))
      setPreviousRound(await client.invoke("lottery:getRound", {round: Math.floor(nodeInfo.height / 100) - 1}))
      setHeight(nodeInfo.height)
    }
    getLotteryData()
    const interval = setInterval(() => getLotteryData(), 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (account?.chain?.token?.balance && balance === 0) {
      setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
    }
  }, [account])

  return (<div className="w--full mx-auto space-y-8">
      <Header
        title="Welcome to the Lisk Lottery!"
        subTitle="Get your tickets now!"
        gradient/>
      {round && activePrizes?.length > 0 && <div
        className="w-app mx-auto flex flex-col md:flex-row bg-gradient-to-r from-green-400  to-green-500 rounded-default py-2 px-4 justify-between items-center">
        <span className="font-medium text-white text-18px flex items-center ">AMAZING! You won with <span
          className="mx-4 text-yellow-300 font-medium text-32px">{activePrizes?.length} tickets</span> in the lottery!</span>
        <Button onClick={onClaim} label="Claim"/>
      </div>}
      <div className="w-app mx-auto mb-8 ">
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
          flex flex-col w-full md:w-1/3 space-y-4  rounded-default py-4 px-8">
            <div className="flex flex-row space-x-4 text-24px">
              <Typography type="span" className="font-bold text-white">
                Next draw in {100 - (height - Math.floor(height / 100) * 100)} blocks
              </Typography>
            </div>
            <div className="flex flex-row space-x-4">
              <Typography type="span" className="font-medium text-white">Current round</Typography>
              <Typography type="span" className="font-medium text-yellow-300">#{Math.floor(height / 100)}</Typography>
            </div>

            <div className="flex flex-col space-y-2">
              <span className="font-medium text-white">Total Pricepool:</span>
              <span
                className="text-yellow-300 font-bold text-32px">
                {round?.safe && parseFloat(transactions.convertBeddowsToLSK(round.safe)).toFixed(1) || 0} LSK
              </span>
            </div>
            <div className="flex flex-col">
              <LotteryPriceNumbers
                currentPricePot={round?.safe && transactions.convertBeddowsToLSK(round.safe) || 0}
                draw={0.5}
                totalNumbers={4}/>
              <LotteryPriceNumbers
                currentPricePot={round?.safe && transactions.convertBeddowsToLSK(round.safe) || 0}
                draw={0.33}
                totalNumbers={3}/>
              <LotteryPriceNumbers
                currentPricePot={round?.safe && transactions.convertBeddowsToLSK(round.safe) || 0}
                draw={0.1}
                totalNumbers={2}/>
            </div>
          </div>
          {/*LAST DRAW*/}
          <div className="bg-gradient-to-r from-indigo-600  to-indigo-800
          flex flex-col w-full md:w-1/3 space-y-4  rounded-default py-4 px-8">
            <div className="flex flex-row space-x-4 text-24px">
              <Typography type="span" className="font-bold text-white">Round
                #{Math.floor(height / 100) - 1}</Typography>
            </div>
            <div className="flex flex-col space-y-4">
              <span className="font-medium text-white">Winning Numbers:</span>
              <div className="flex flex-row space-x-4">
                <MyLotteryNumbers round={previousRound} numbers={previousRound?.numbers}/>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-white">Total Prize Pool:</span>
              <span
                className="text-yellow-300 font-bold text-32px">
                {previousRound?.safe && parseFloat(transactions.convertBeddowsToLSK(previousRound.safe)).toFixed(2) || 0} LSK
              </span>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col space-y-4">
                  <span className="font-medium text-white">No. Matched</span>
                  <span className="text-yellow-300 font-bold text-24px">4</span>
                  <span className="text-yellow-300 font-bold text-24px">3</span>
                  <span className="text-yellow-300 font-bold text-24px">2</span>
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="font-medium text-white">Winners</span>
                  <span className="font-medium text-white text-24px">
                    {previousRound?.results && previousRound.results.find(res => res.correctNumbers === 4)?.wins || 0}
                  </span>
                  <span className="font-medium text-white text-24px">
                    {previousRound?.results && previousRound.results.find(res => res.correctNumbers === 3)?.wins || 0}
                  </span>
                  <span className="font-medium text-white text-24px">
                    {previousRound?.results && previousRound.results.find(res => res.correctNumbers === 2)?.wins || 0}
                  </span>
                </div>
                <div className="flex flex-col space-y-4 text-right">
                  <span className="font-medium text-white">Prize Pool</span>
                  <span className="font-medium text-white text-24px">
                    {previousRound?.safe && parseFloat(transactions.convertBeddowsToLSK((((BigInt(previousRound.safe) * BigInt(100)) / BigInt(2)) / BigInt(100)).toString())).toFixed(2) || 0} LSK
                  </span>
                  <span className="font-medium text-white text-24px">
                    {previousRound?.safe && parseFloat(transactions.convertBeddowsToLSK((((BigInt(previousRound.safe) * BigInt(100)) / BigInt(3)) / BigInt(100)).toString())).toFixed(2) || 0} LSK
                  </span>
                  <span className="font-medium text-white text-24px">
                    {previousRound?.safe && parseFloat(transactions.convertBeddowsToLSK((((BigInt(previousRound.safe) * BigInt(100)) / BigInt(10)) / BigInt(100)).toString())).toFixed(2) || 0} LSK
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-gradient-to-r from-indigo-600 to-indigo-800 flex flex-col w-full md:w-1/3 space-y-4 rounded-default py-4 px-8">
            <div className="flex flex-col text-24px">
              <Typography type="span" className="font-bold text-white mb-4">Your Tickets</Typography>
              <div className="flex flex-col space-y-4">
                {activeTickets && round && activeTickets
                  .filter(ticket => ticket.round === round.round)
                  .map(ticket => <MyLotteryNumbers
                    currentRound={round}
                    round={previousRound}
                    won={activePrizes}
                    ticket={ticket}/>)}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 mx-auto flex flex-col">
            <div className="flex w-full flex-row space-x-4">
              <div
                className="flex w-full flex-col  space-y-4 bg-gradient-to-r from-green-400  to-green-500 rounded-default p-4">
                <div className="flex flex-col space-y-2">
                  <Typography type="span" className="font-medium text-white">Balance</Typography>
                  <SimpleInput readOnly value={balance} description descriptionMessage="test"/>
                </div>
                <div className="flex flex-col space-y-2">
                  <Typography type="span" className="font-medium text-white">Total Tickets</Typography>
                  <div className="flex flex-col">
                    <SimpleInput readOnly placeholder placeHolder={tickets} description descriptionMessage="test"/>
                    <ButtonGroup
                      className="mx-auto my-4 "
                      buttons={[
                        {
                          label: "1",
                          onClick: () => updateTickets(1),
                          disabled: account?.chain && transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString()) < tickets * 5
                        },
                        {
                          label: "5",
                          onClick: () => updateTickets(5),
                          disabled: account?.chain && transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString()) < tickets * 5
                        },
                        {
                          label: "10",
                          onClick: () => updateTickets(10),
                          disabled: account?.chain && transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString()) < tickets * 5
                        },
                        {
                          label: "25",
                          onClick: () => updateTickets(25),
                          disabled: account?.chain && transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString()) < tickets * 5
                        },
                      ]}/>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Typography type="span" className="font-medium text-white">Total Cost</Typography>
                    <SimpleInput readOnly value={tickets * 5} description descriptionMessage="test"/>
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <Button disabled={buyDisabled} className="w-full" secondary label="Buy Tickets" onClick={buyTickets}/>
                  <Button className="w-full" onClick={() => {
                    setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
                    setTickets(0)
                  }} secondary label="Clear"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
