import {codec} from "lisk-sdk";
import {ResultRng} from "../../rng/rng_module";
import {JackpotType} from "../types";

const CHAIN_STATE_POKER_JACKPOT = "poker:jackpot";

const JackpotStateStoreSchema = {
  $id: "poker/jackpot",
  type: "object",
  required: ["jackpot", "luckyNumber", "history"],
  properties: {
    jackpot: {
      fieldNumber: 1,
      dataType: "uint64",
    },
    luckyNumber: {
      fieldNumber: 2,
      dataType: "uint32",
    },
    history: {
      fieldNumber: 3,
      type: "array",
      items: {
        type: "object",
        required: ["nonce", "winner", "id", "amount", "height"],
        properties: {
          nonce: {
            fieldNumber: 1,
            dataType: "uint32",
          },
          winner: {
            fieldNumber: 2,
            dataType: "bytes"
          },
          id: {
            fieldNumber: 3,
            dataType: "bytes",
          },
          amount: {
            fieldNumber: 4,
            dataType: "uint64",
          },
          height: {
            fieldNumber: 5,
            dataType: "uint32",
          },
        }
      }
    }
  }
}

export const updateJackpot = async (stateStore, reducerHandler, game) => {
  const jackpotStoreBuffer = await stateStore.chain.get(`${CHAIN_STATE_POKER_JACKPOT}`);
  const updatedJackpot: JackpotType = jackpotStoreBuffer ?
    codec.decode(JackpotStateStoreSchema, jackpotStoreBuffer) : {
      jackpot: BigInt(0),
      luckyNumber: 1,
      history: [],
    }
  const luckyNumber: ResultRng = await reducerHandler.invoke('rng:getNumber', {
    min: 0,
    max: 100,
    height: game.height,
    type: 0,
    amount: 2,
    superSeed: game.id.toString('hex')
  });
  if (luckyNumber && luckyNumber.numbers && luckyNumber.numbers[0].number === updatedJackpot.luckyNumber) {
    // game won jackpot
    if (BigInt(updatedJackpot.jackpot) > BigInt(0)) {
      reducerHandler.invoke("token:credit", {
        address: game.player,
        amount: BigInt(updatedJackpot.jackpot)
      })
    }

    updatedJackpot.history.push({
      nonce: updatedJackpot.history.sort((a, b) => a.nonce - b.nonce)[0].nonce + 1,
      winner: game.playerAddress,
      id: game.id,
      amount: BigInt(updatedJackpot.jackpot),
      height: game.height,
    })
    updatedJackpot.jackpot = BigInt(0);
    updatedJackpot.luckyNumber = luckyNumber.numbers[1].number
  } else {
    updatedJackpot.jackpot = BigInt(updatedJackpot.jackpot ? updatedJackpot.jackpot : 0) + (((BigInt(game.wager) * BigInt(100)) / BigInt(10)) / BigInt(100))
  }
  await stateStore.chain.set(
    `${CHAIN_STATE_POKER_JACKPOT}`,
    codec.encode(JackpotStateStoreSchema, updatedJackpot)
  )
}
