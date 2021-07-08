/* global BigInt */
import React, {useContext, useEffect, useState} from "react";
import {Button, ButtonGroup, Container, SimpleInput, Typography} from "@moosty/dao-storybook";
import {Dealer} from "../components/Dealer";
import {Player} from "../components/Player";
import {TableTransactions} from "../components/TableTransactions";
import {Buffer, transactions} from '@liskhq/lisk-client'
import {getGameId} from "../utils/common";
import {createTransaction} from "../utils/transactions";
import {AppContext} from "../appContext";

export const Blackjack = ({account}) => {
  const {getClient} = useContext(AppContext);
  const [bet, setBet] = useState(0)
  const [balance, setBalance] = useState(0)
  const [game, setGame] = useState(null)
  const [activeGameId, setActiveGameId] = useState(null)
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    const getGame = async () => {
      const client = await getClient
      setGame(await client.invoke('poker:getGameById', {id: activeGameId}))
    }
    if (activeGameId) {
      // setTimeout(() => getGame(), 300)
      getGame()
    }
  }, [activeGameId])

  useEffect(() => {
    if (account?.chain?.token?.balance && balance === 0) {
      setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
    }
  }, [account])

  const onStand = async (hand) => {
    const client = await getClient
    try {
      const result = await createTransaction({
        moduleId: 8890,
        assetId: 2,
        assets: {
          gameId: Buffer.from(activeGameId, 'hex'),
          hand: game.playerHands.findIndex(h => h.id === hand),
        },
        account,
        client,
      })
      if (result.status) {
        const findTransaction = async () => {
          try {
            await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
            setGame(await client.invoke('poker:getGameById', {id: activeGameId}))
            setActiveGameId(null)
          } catch (e) {
            setTimeout(async () => await findTransaction(), 1000)
          }
        }
        await findTransaction()
      } else {
        setLoadingCreate(false)
        console.log(result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onHit = async (hand) => {
    const client = await getClient
    try {
      const result = await createTransaction({
        moduleId: 8890,
        assetId: 1,
        assets: {
          gameId: Buffer.from(activeGameId, 'hex'),
          hand: game.playerHands.findIndex(h => h.id === hand),
        },
        account,
        client,
      })
      if (result.status) {
        const findTransaction = async () => {
          try {
            await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
            setGame(await client.invoke('poker:getGameById', {id: activeGameId}))
          } catch (e) {
            setTimeout(async () => await findTransaction(), 1000)
          }
        }
        await findTransaction()
      } else {
        setLoadingCreate(false)
        console.log(result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSplit = async (hand) => {
    const client = await getClient
    try {
      const result = await createTransaction({
        moduleId: 8890,
        assetId: 3,
        assets: {
          gameId: Buffer.from(activeGameId, 'hex'),
          hand: game.playerHands.findIndex(h => h.id === hand),
        },
        account,
        client,
      })
      if (result.status) {
        const findTransaction = async () => {
          try {
            await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
            setGame(await client.invoke('poker:getGameById', {id: activeGameId}))
          } catch (e) {
            setTimeout(async () => await findTransaction(), 1000)
          }
        }
        await findTransaction()
      } else {
        setLoadingCreate(false)
        console.log(result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onDouble = async (hand) => {
    const client = await getClient
    try {
      const result = await createTransaction({
        moduleId: 8890,
        assetId: 4,
        assets: {
          gameId: Buffer.from(activeGameId, 'hex'),
          hand: game.playerHands.findIndex(h => h.id === hand),
        },
        account,
        client,
      })
      if (result.status) {
        const findTransaction = async () => {
          try {
            await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
            setGame(await client.invoke('poker:getGameById', {id: activeGameId}))
          } catch (e) {
            setTimeout(async () => await findTransaction(), 1000)
          }
        }
        await findTransaction()
      } else {
        setLoadingCreate(false)
        console.log(result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const startNewGame = async () => {
    const client = await getClient
    setLoadingCreate(true)
    try {
      setActiveGameId(1)
      const result = await createTransaction({
        moduleId: 8890,
        assetId: 0,
        assets: {
          wager: BigInt(transactions.convertLSKToBeddows(bet.toString()))
        },
        account,
        client,
      })
      if (result.status) {
        const gameId = getGameId(Buffer.from(account?.address, 'hex'), result.nonce)
        const findTransaction = async () => {
          try {
            await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
            setActiveGameId(gameId.toString('hex'))
          } catch (e) {
            setTimeout(async () => await findTransaction(), 1000)
          }
        }
        await findTransaction()

      } else {
        setLoadingCreate(false)
        console.log(result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const updateBet = (value) => {
    setBet(bet + value)
    setBalance(balance - value)
  }

  return <div className={"h-full w-app mx-auto"}>
    <Container className={"w-full flex flex-row space-x-4 mt-8 "}>
      <div style={{backgroundColor: "#114602"}} className="w-3/4 mx-auto rounded-default  p-8 space-y-8 ">
        {game && <Dealer cards={game.houseCards} result={5}/>}
        {game && <Player
          onDouble={onDouble}
          onSplit={onSplit}
          onHit={onHit}
          onStand={onStand}
          hands={game.playerHands}
          bet={bet}
          result={6}
        />}
      </div>
      <div className="w-1/4 mx-auto flex flex-col">
        <div className="flex w-full flex-row space-x-4">
          <div className="flex w-full flex-col  space-y-4 bg-gradient-to-r from-indigo-600  to-indigo-800 rounded-default
          p-4">
            <div className="flex flex-col space-y-2">
              <Typography type="span" className="font-medium text-white">Balance</Typography>
              <SimpleInput readOnly value={balance} description descriptionMessage="test"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Typography type="span" className="font-medium text-white">Total Bet</Typography>
              <div className="flex flex-col">
                <SimpleInput readOnly placeholder placeHolder={bet} description descriptionMessage="test"/>
                <ButtonGroup
                  className="mx-auto my-4 "
                  buttons={[
                    {label: "1", onClick: () => updateBet(1)},
                    {label: "5", onClick: () => updateBet(5)},
                    {label: "10", onClick: () => updateBet(10)},
                    {label: "25", onClick: () => updateBet(25)},
                  ]}/>
              </div>
              <div className="flex flex-row space-x-2">
                <Button className="w-full" secondary label={activeGameId ? "In game.." : "Deal!"} onClick={startNewGame} disabled={game?.open === 1 || activeGameId} />
                <Button className="w-full" onClick={() => {
                  setBalance(parseInt(transactions.convertBeddowsToLSK(account?.chain?.token?.balance?.toString())))
                  setBet(0)
                }} secondary label="Clear"/></div>
            </div>
          </div>
          {/*<div className="w-3/4 bg-gradient-to-r from-indigo-600  to-indigo-800 p-8 rounded-default flex flex-col space-y-4">*/}
          {/*  <TableTransactions/>*/}
          {/*</div>*/}
        </div>
      </div>

    </Container>
  </div>
}
