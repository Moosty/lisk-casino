import {codec, cryptography} from "lisk-sdk";
import {ResultRng} from "../../rng/rng_module";
import {Round, Ticket} from "../types";

export const CHAIN_STATE_LOTTERY_TICKETS = "lottery:tickets";
export const CHAIN_STATE_LOTTERY_PLAYER = "lottery:archive";
export const CHAIN_STATE_LOTTERY_ROUNDS = "lottery:rounds";

export const TicketsArchiveStateStoreSchema = {
  $id: "lottery/archive",
  type: "object",
  required: ["tickets"],
  properties: {
    tickets: {
      fieldNumber: 1,
      type: "array",
      items: {
        dataType: "bytes",
      }
    }
  }
}

export const LotteryRoundsStateStoreSchema = {
  $id: "lottery/rounds",
  type: "object",
  required: ["round", "numbers", "state", "tickets", "results", "safe"],
  properties: {
    round: {
      fieldNumber: 1,
      dataType: "uint32",
    },
    numbers: {
      fieldNumber: 2,
      type: "array",
      items: {
        dataType: "uint32",
      }
    },
    state: {
      fieldNumber: 3,
      dataType: "string",
      enum: ["open", "resolved"]
    },
    tickets: {
      fieldNumber: 4,
      type: "array",
      items: {
        dataType: "uint32",
      }
    },
    results: {
      fieldNumber: 5,
      type: "array",
      items: {
        type: "object",
        required: ['correctNumbers', 'wins'],
        properties: {
          correctNumbers: {
            fieldNumber: 1,
            dataType: 'uint32',
          },
          wins: {
            fieldNumber: 2,
            dataType: 'uint32',
          },
          price: {
            fieldNumber: 3,
            dataType: 'uint64',
          }
        }
      }
    },
    safe: {
      fieldNumber: 6,
      dataType: "uint64",
    }
  }
}

export const TicketsStateStoreSchema = {
  $id: "lottery/tickets",
  type: "object",
  required: ["round", "owner", "nonce", "id", "numbers", "state", "correct"],
  properties: {
    round: {
      fieldNumber: 1,
      dataType: "uint32",
    },
    owner: {
      fieldNumber: 2,
      dataType: "bytes",
    },
    nonce: {
      fieldNumber: 3,
      dataType: "uint64",
    },
    id: {
      fieldNumber: 4,
      dataType: "bytes",
    },
    numbers: {
      fieldNumber: 5,
      type: "array",
      items: {
        dataType: "uint32",
      }
    },
    state: {
      fieldNumber: 6,
      dataType: "string",
      enum: ["open", "resolved"]
    },
    correct: {
      fieldNumber: 7,
      dataType: "uint32",
      default: 0
    }
  }
}

export const getTicketId = (address, nonce) => {
  const nonceBuffer = Buffer.from(nonce.toString());
  const seed = Buffer.concat([
    address,
    nonceBuffer,
  ]);
  return cryptography.hash(seed);
}

export const createEmptyTicket = ({address, nonce}) => ({
  id: getTicketId(address, nonce),
})

export const findTicketById = async (stateStore, id) => {
  const ticketBuffer = await stateStore.chain.get(`${CHAIN_STATE_LOTTERY_TICKETS}:${id.toString('hex')}`)
  return ticketBuffer ? codec.decode(
    TicketsStateStoreSchema,
    ticketBuffer,
  ) : null
}

export const getTicketRound = async (stateStore, round): Promise<Round> => {
  const roundBuffer = await stateStore.chain.get(`${CHAIN_STATE_LOTTERY_ROUNDS}:${round}`)
  return roundBuffer ? codec.decode(
    LotteryRoundsStateStoreSchema,
    roundBuffer,
  ) : getEmptyRound(round)
}

export const getEmptyRound = (round: number): Round => {
  return {
    round,
    numbers: [],
    state: "open",
    tickets: [],
    // @ts-ignore
    results: {},
    safe: BigInt(0),
  }
}

export const addRound = async ({stateStore, round, ticket}) => {
  const roundStore = await stateStore.chain.get(`${CHAIN_STATE_LOTTERY_TICKETS}:${round}`)
  if (roundStore) {
    return true;
  }
  const newRound = {
    round,
    numbers: [],
    state: "open",
    tickets: ticket ? [ticket] : [],
    results: {},
    safe: ticket ? BigInt(500000000) : BigInt(0),
  }
  await stateStore.chain.set(`${CHAIN_STATE_LOTTERY_ROUNDS}:${round}`,
    codec.encode(LotteryRoundsStateStoreSchema, newRound))
  return true;
}

export const addTicketToRound = async ({stateStore, round, ticket}) => {
  const roundStore = await stateStore.chain.get(`${CHAIN_STATE_LOTTERY_TICKETS}:${round}`)
  if (!roundStore) {
    await addRound({stateStore, round, ticket})
    return true;
  }
  roundStore.tickets.push(ticket)
  roundStore.safe = roundStore.safe + BigInt(500000000)
  await stateStore.chain.set(`${CHAIN_STATE_LOTTERY_ROUNDS}:${round}`,
    codec.encode(LotteryRoundsStateStoreSchema, roundStore))
  return true;
}

export const updateRound = async ({stateStore, round}) => {
  await stateStore.chain.set(`${CHAIN_STATE_LOTTERY_ROUNDS}:${round.round}`,
    codec.encode(LotteryRoundsStateStoreSchema, round))
  return true;
}

export const updateTicket = async (stateStore, ticket) => {
  const ticketStore = await stateStore.chain.get(`${CHAIN_STATE_LOTTERY_TICKETS}:${ticket.id.toString('hex')}`)
  if (!ticketStore) {
    throw new Error(
      `Ticket not found`
    )
  }
  await stateStore.chain.set(`${CHAIN_STATE_LOTTERY_TICKETS}:${ticket.id.toString('hex')}`,
    codec.encode(TicketsStateStoreSchema, ticket))
}

export const addTicket = async (stateStore, {reducerHandler, ticket}) => {
  const ticketStore = await stateStore.chain.get(`${CHAIN_STATE_LOTTERY_TICKETS}:${ticket.id.toString('hex')}`)
  if (ticketStore) {
    throw new Error(
      `Ticket already exist`
    )
  }
  const ticketNumbers: ResultRng = await reducerHandler.invoke('rng:getNumber', {
    min: 0,
    max: 99,
    height: ticket.height,
    type: 0,
    amount: 4,
    superSeed: ticket.id.toString('hex')
  });
  if (ticketNumbers.numbers.length !== 4) {
    if (ticketStore) {
      throw new Error(
        `RNG module failed`
      )
    }
  }
  const newTicket = {
    round: Math.floor(ticket.height / 1000),
    owner: ticket.playerAddress,
    nonce: ticket.nonce,
    id: ticket.id,
    numbers: [
      ...ticketNumbers.numbers.map(num => num.number)
    ],
    state: "open",
    correct: 0,
  }
  await addTicketToAccount(stateStore, ticket.id, ticket.playerAddress)
  await stateStore.chain.set(`${CHAIN_STATE_LOTTERY_TICKETS}:${ticket.id.toString('hex')}`,
    codec.encode(TicketsStateStoreSchema, newTicket))
  await addTicketToRound({stateStore, ticket: ticket.id, round: newTicket.round})
}

export const getTicketArchive = async (stateStore, playerAddress) => {
  const ticketArchiveBuffer = await stateStore.chain.get(`${CHAIN_STATE_LOTTERY_PLAYER}:${playerAddress.toString('hex')}`);
  return ticketArchiveBuffer ? codec.decode(
    TicketsArchiveStateStoreSchema,
    ticketArchiveBuffer,
  ) : null
}

export const addTicketToAccount = async (stateStore, ticketId, playerAddress) => {
  const account = await stateStore.account.get(playerAddress)
  if (!account || !account.lottery.tickets) {
    throw new Error(
      `Account not found`
    )
  }
  account.lottery.tickets.push(ticketId)
  await stateStore.account.set(playerAddress, account)
}

export const archivePrice = async (stateStore, ticket: Ticket) => {
  const account = await stateStore.account.get(ticket.owner)
  if (!account || !account.lottery.prices) {
    throw new Error(
      `Account not found`
    )
  }
  account.lottery.prices = account.lottery.prices.filter(id => !id.equals(ticket.id))
  await stateStore.account.set(ticket.owner, account)
}

export const archiveTicket = async (stateStore, ticketId, playerAddress) => {
  const account = await stateStore.account.get(playerAddress)
  if (!account || !account.lottery.tickets) {
    throw new Error(
      `Account not found`
    )
  }
  account.lottery.tickets = account.lottery.tickets.filter(id => !id.equals(ticketId))
  await stateStore.account.set(playerAddress, account)
  const ticketArchiveBuffer = await stateStore.chain.get(`${CHAIN_STATE_LOTTERY_PLAYER}:${playerAddress.toString('hex')}`);
  let ticketsArchive: any = ticketArchiveBuffer ? codec.decode(
    TicketsArchiveStateStoreSchema,
    ticketArchiveBuffer,
  ) : null
  if (!ticketsArchive) {
    ticketsArchive = {
      tickets: [ticketId]
    };
  } else {
    ticketsArchive.tickets.push(ticketId)
  }
  await stateStore.chain.set(
    `${CHAIN_STATE_LOTTERY_PLAYER}:${playerAddress.toString('hex')}`,
    codec.encode(TicketsArchiveStateStoreSchema, ticketsArchive)
  )
}


