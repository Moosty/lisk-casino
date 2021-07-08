import {codec} from "lisk-sdk";
import {CHAIN_STATE_POKER_GAMES, GamesStateStoreSchema} from "../reducers/games";

export const getGameById = async (dataAccess, id) => {
  const gameBuffer = await dataAccess.getChainState(`${CHAIN_STATE_POKER_GAMES}:${id.toString('hex')}`)
  return gameBuffer ? codec.toJSON(GamesStateStoreSchema, codec.decode(
    GamesStateStoreSchema,
    gameBuffer,
  )) : null
}
