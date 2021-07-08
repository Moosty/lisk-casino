import {codec} from "lisk-sdk";
import {CHAIN_STATE_POKER_JACKPOT, JackpotStateStoreSchema} from "../reducers/jackpot";

export const getJackpot = async (dataAccess) => {
  const jackpotBuffer = await dataAccess.getChainState(`${CHAIN_STATE_POKER_JACKPOT}`)
  return jackpotBuffer ? codec.toJSON(JackpotStateStoreSchema, codec.decode(
    JackpotStateStoreSchema,
    jackpotBuffer,
  )) : null
}
