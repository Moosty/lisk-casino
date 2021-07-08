import {codec, cryptography} from "lisk-sdk";
import {ResultRng} from "../../rng/rng_module";
import {blackjackDeck} from "../constants";

export const CHAIN_STATE_POKER_GAMES = "poker:games";
export const CHAIN_STATE_POKER_PLAYER = "poker:archive";

export const GamesArchiveStateStoreSchema = {
  $id: "poker/archive",
  type: "object",
  required: ["games"],
  properties: {
    games: {
      fieldNumber: 1,
      type: "array",
      items: {
        dataType: "bytes",
      }
    }
  }
}

export const GamesStateStoreSchema = {
  $id: "poker/games",
  type: "object",
  required: ["open", "wager", "playerHands", "houseCards", "playerAddress", "id", "height"],
  properties: {
    open: {
      fieldNumber: 1,
      dataType: "uint32",
      default: 1,
    },
    wager: {
      fieldNumber: 2,
      dataType: "uint64",
    },
    playerHands: {
      fieldNumber: 3,
      type: "array",
      items: {
        type: "object",
        required: ["id", "cards", "state", "double", "count"],
        properties: {
          id: {
            fieldNumber: 1,
            dataType: "uint32",
          },
          state: {
            fieldNumber: 2,
            dataType: "string",
            enum: ["undecided", "hold", "won", "lost", "draw"]
          },
          cards: {
            fieldNumber: 3,
            type: "array",
            items: {
              dataType: "uint32",
            }
          },
          double: {
            fieldNumber: 4,
            dataType: "boolean",
            default: false,
          },
          count: {
            fieldNumber: 5,
            dataType: "uint32",
          }
        }
      }
    },
    houseCards: {
      fieldNumber: 4,
      type: "array",
      items: {
        dataType: "uint32",
      }
    },
    playerAddress: {
      fieldNumber: 5,
      dataType: "bytes",
    },
    id: {
      fieldNumber: 6,
      dataType: "bytes"
    },
    height: {
      fieldNumber: 7,
      dataType: "uint32"
    }
  }
}

export const getGameId = (address, nonce) => {
  const nonceBuffer = Buffer.from(nonce.toString());
  const seed = Buffer.concat([
    address,
    nonceBuffer,
  ]);
  return cryptography.hash(seed);
}

export const createEmptyGame = ({wager, address, nonce}) => ({
  id: getGameId(address, nonce),
  wager,
})

export const findGameById = async (stateStore, id) => {
  const gameBuffer = await stateStore.chain.get(`${CHAIN_STATE_POKER_GAMES}:${id.toString('hex')}`)
  return gameBuffer ? codec.decode(
    GamesStateStoreSchema,
    gameBuffer,
  ) : null
}

export const updateGame = async (stateStore, game) => {
  const gameStore = await stateStore.chain.get(`${CHAIN_STATE_POKER_GAMES}:${game.id.toString('hex')}`)
  if (!gameStore) {
    throw new Error(
      `Game not found`
    )
  }
  await stateStore.chain.set(`${CHAIN_STATE_POKER_GAMES}:${game.id.toString('hex')}`,
    codec.encode(GamesStateStoreSchema, game))
}

export const addGame = async (stateStore, {reducerHandler, game}) => {
  const gameStore = await stateStore.chain.get(`${CHAIN_STATE_POKER_GAMES}:${game.id.toString('hex')}`)
  if (gameStore) {
    throw new Error(
      `Game already exist`
    )
  }
  const initialCards: ResultRng = await reducerHandler.invoke('rng:getNumber', {
    min: 0,
    max: 51,
    height: game.height,
    type: 0,
    amount: 3,
    superSeed: game.id.toString('hex')
  });
  if (initialCards.numbers.length !== 3) {
    if (gameStore) {
      throw new Error(
        `RNG module failed`
      )
    }
  }
  const newGame = {
    open: 1,
    wager: game.wager,
    playerHands: [
      {
        id: 0,
        state: "undecided",
        cards: [
          initialCards.numbers[0].number,
          initialCards.numbers[1].number,
        ],
        double: false,
        count: blackjackDeck[initialCards.numbers[0].number] + blackjackDeck[initialCards.numbers[1].number],
      }
    ],
    houseCards: [
      initialCards.numbers[2].number,
    ],
    playerAddress: game.playerAddress,
    id: game.id,
    height: game.height,
  }
  await addGameToAccount(stateStore, game.id, game.playerAddress)
  await stateStore.chain.set(`${CHAIN_STATE_POKER_GAMES}:${game.id.toString('hex')}`,
    codec.encode(GamesStateStoreSchema, newGame))
}

export const getGameArchive = async (stateStore, playerAddress) => {
  const gameArchiveBuffer = await stateStore.chain.get(`${CHAIN_STATE_POKER_PLAYER}:${playerAddress.toString('hex')}`);
  return gameArchiveBuffer ? codec.decode(
    GamesArchiveStateStoreSchema,
    gameArchiveBuffer,
  ) : null
}

export const addGameToAccount = async (stateStore, gameId, playerAddress) => {
  const account = await stateStore.account.get(playerAddress)
  if (!account || !account.poker.games) {
    throw new Error(
      `Account not found`
    )
  }
  account.poker.games.push(gameId)
  await stateStore.account.set(playerAddress, account)
}

export const archiveGame = async (stateStore, gameId, playerAddress) => {
  const account = await stateStore.account.get(playerAddress)
  if (!account || !account.poker.games) {
    throw new Error(
      `Account not found`
    )
  }
  account.poker.games = account.poker.games.filter(id => !id.equals(gameId))
  await stateStore.account.set(playerAddress, account)
  const gameArchiveBuffer = await stateStore.chain.get(`${CHAIN_STATE_POKER_PLAYER}:${playerAddress.toString('hex')}`);
  let gamesArchive: any = gameArchiveBuffer ? codec.decode(
    GamesArchiveStateStoreSchema,
    gameArchiveBuffer,
  ) : null
  if (!gamesArchive) {
    gamesArchive = {
      games: [gameId]
    };
  } else {
    gamesArchive.games.push(gameId)
  }
  await stateStore.chain.set(
    `${CHAIN_STATE_POKER_PLAYER}:${playerAddress.toString('hex')}`,
    codec.encode(GamesArchiveStateStoreSchema, gamesArchive)
  )
}


