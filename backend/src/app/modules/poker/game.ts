import {Game} from "./types";
import {ResultRng} from "../rng/rng_module";
import {blackjackDeck} from "./constants";
import {Buffer} from "buffer";
import {archiveGame, updateGame} from "./reducers/games";
import {updateJackpot} from "./reducers/jackpot";

export const isLastHand = (game: Game): boolean => {
  return game.playerHands.filter(playerHand => playerHand.state === "undecided").length === 0;
}

export const endGame = async (stateStore, reducerHandler, game, transaction): Promise<void> => {
  game.houseCards = await dealerCardPicker(stateStore, reducerHandler, game)
  const updatedGame = decideGame(game)
  let won = BigInt(0);
  let lost = BigInt(0);
  updatedGame.playerHands.map(hand => {
    if (hand.state === "won") {
      won += BigInt(updatedGame.wager) * BigInt(2) * BigInt(hand.double ? 2 : 1)
    } else if (hand.state === "draw") {
      won += BigInt(updatedGame.wager) * BigInt(hand.double ? 2 : 1)
    } else if (hand.state === "lost") {
      lost += BigInt(updatedGame.wager) * BigInt(hand.double ? 2 : 1)
    }
  })
  console.log(updatedGame, 111222333, won, lost)
  if (won > BigInt(0)) {
    reducerHandler.invoke("token:credit", {
      address: transaction.senderAddress,
      amount: won
    })
  }
  // todo: treasury address
  if (lost > BigInt(0)) {
    reducerHandler.invoke("token:credit", {
      address: Buffer.from("55d877e266e24a99d338163b512077b8609ba9b1", 'hex'),
      amount: lost
    })
  }
  console.log(updatedGame)
  updatedGame.open = 0
  await updateGame(stateStore, updatedGame)
  console.log(123)
  await archiveGame(stateStore, updatedGame.id, transaction.senderAddress)
  console.log(234)

  await updateJackpot(stateStore, reducerHandler, game)
  console.log(345)

}

export const decideGame = (game: Game): Game => {
  game.playerHands = game.playerHands.map(hand => ({
    ...hand,
    state: decideHand(hand, game.houseCards)
  }))
  return game;
}

export const decideHand = (hand, house) => {
  return getHandCount(hand.cards) > 21 ? "lost" :
    getHandCount(house) > 21 ? "won" :
      getHandCount(hand.cards) === getHandCount(house) ? "draw" :
        getHandCount(hand.cards) > getHandCount(house) ? "won" :
          "lost"
}

export const getHandCount = (hand: Array<number>) => {
  const convertedCards = hand.map(card => blackjackDeck[card])
  let sum = 0;
  convertedCards.sort(Number).map(card => {
    sum += sum > 10 && card === 11 ? 1 : card;
  })
  return sum;
}

export const dealerCardPicker = async (stateStore, reducerHandler, game: Game): Promise<Array<number>> => {
  const randomCards: ResultRng = await reducerHandler.invoke('rng:getNumber', {
    min: 0,
    max: 51,
    height: stateStore.chain.lastBlockHeaders[0].height,
    type: 0,
    amount: 5,
    superSeed: game.id,
  });
  const cards = game.houseCards;
  let count = blackjackDeck[cards[0]]
  let done = false;
  let currentPick = 0;
  while (!done) {
    if (count < 17) {
      const nextCard = randomCards.numbers[currentPick].number;
      cards.push(nextCard)
      currentPick++;
      count += blackjackDeck[nextCard];
    }
    if (count > 21 && handContainsAce(cards)) {
      const aceIsOneCount = cards.reduce((sum, card) => sum + (blackjackDeck[card] === 11 ? 1 : blackjackDeck[card]))
      if (aceIsOneCount < 17) {
        const nextCard = randomCards.numbers[currentPick].number;
        cards.push(nextCard)
        currentPick++;
        count = aceIsOneCount + blackjackDeck[nextCard];
      } else {
        done = true;
      }
    }
    if (count >= 17 && !(count > 21 && handContainsAce(cards))) {
      done = true;
    }
  }

  return cards
}

const handContainsAce = (cards) => {
  return cards.find(card => blackjackDeck[card] === 11)
}
