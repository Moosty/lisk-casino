import {codec} from "lisk-sdk";
import {CHAIN_STATE_LOTTERY_ROUNDS, CHAIN_STATE_LOTTERY_PLAYER, CHAIN_STATE_LOTTERY_TICKETS, LotteryRoundsStateStoreSchema, TicketsArchiveStateStoreSchema, TicketsStateStoreSchema} from "../reducers/tickets";

export const getTicketById = async (dataAccess, id) => {
  const buffer = await dataAccess.getChainState(`${CHAIN_STATE_LOTTERY_TICKETS}:${id.toString('hex')}`)
  return buffer ? codec.toJSON(TicketsStateStoreSchema, codec.decode(
    TicketsStateStoreSchema,
    buffer,
  )) : null
}

export const getRound = async (dataAccess, round) => {
  const buffer = await dataAccess.getChainState(`${CHAIN_STATE_LOTTERY_ROUNDS}:${round}`)
  console.log(buffer, codec.decode(
    LotteryRoundsStateStoreSchema,
    buffer,
  ))
  return buffer ? codec.toJSON(LotteryRoundsStateStoreSchema, codec.decode(
    LotteryRoundsStateStoreSchema,
    buffer,
  )) : null
}

export const getPlayerArchive = async (dataAccess, address) => {
  const buffer = await dataAccess.getChainState(`${CHAIN_STATE_LOTTERY_PLAYER}:${address}`)
  return buffer ? codec.toJSON(TicketsArchiveStateStoreSchema, codec.decode(
    TicketsArchiveStateStoreSchema,
    buffer,
  )) : null
}
