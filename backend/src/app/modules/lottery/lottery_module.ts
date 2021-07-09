/*
 * LiskHQ/lisk-commander
 * Copyright © 2021 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */

/* eslint-disable class-methods-use-this */

import {
  AfterBlockApplyContext,
  AfterGenesisBlockApplyContext,
  BaseModule,
  BeforeBlockApplyContext,
  TransactionApplyContext
} from 'lisk-sdk';
import {BuyTicketAsset} from "./assets/buy_ticket_asset";
import {ClaimPriceAsset} from "./assets/claim_price_asset";
import {ResultRng} from "../rng/rng_module";
import {archiveTicket, findTicketById, getTicketRound, updateRound, updateTicket} from "./reducers/tickets";
import {Round, Ticket} from "./types";
import {getPlayerArchive, getRound, getTicketById} from "./actions/lottery";

export class LotteryModule extends BaseModule {
  public accountSchema = {
    $id: 'lottery/account',
    title: 'Lottery prizes',
    type: 'object',
    required: ['prizes', 'nonce'],
    properties: {
      prizes: {
        fieldNumber: 1,
        type: 'array',
        items: {
          dataType: 'bytes',
        }
      },
      nonce: {
        fieldNumber: 2,
        dataType: 'uint64',
      },
      tickets: {
        fieldNumber: 3,
        type: 'array',
        items: {
          dataType: 'bytes'
        }
      }
    },
    default: {
      prizes: [],
      nonce: "0",
      tickets: [],
    }
  }

  // @ts-ignore
  public actions = {
    getTicketById: async ({id}) => await getTicketById(this._dataAccess, id),
    getRound: async ({round}) => await getRound(this._dataAccess, round),
    getPlayerArchive: async ({address}) => await getPlayerArchive(this._dataAccess, address),
  };

  public reducers = {
    // Example below
    // getBalance: async (
    // 	params: Record<string, unknown>,
    // 	stateStore: StateStore,
    // ): Promise<bigint> => {
    // 	const { address } = params;
    // 	if (!Buffer.isBuffer(address)) {
    // 		throw new Error('Address must be a buffer');
    // 	}
    // 	const account = await stateStore.account.getOrDefault<TokenAccount>(address);
    // 	return account.token.balance;
    // },
  };
  public name = 'lottery';
  public transactionAssets = [new BuyTicketAsset(), new ClaimPriceAsset()];
  public events = [
    // Example below
    // 'lottery:newBlock',
  ];
  public id = 8892;

  // public constructor(genesisConfig: GenesisConfig) {
  //     super(genesisConfig);
  // }

  // Lifecycle hooks
  public async beforeBlockApply(_input: BeforeBlockApplyContext) {
    // Get any data from stateStore using block info, below is an example getting a generator
    // const generatorAddress = getAddressFromPublicKey(_input.block.header.generatorPublicKey);
    // const generator = await _input.stateStore.account.get<TokenAccount>(generatorAddress);
  }

  public async afterBlockApply(_input: AfterBlockApplyContext) {
    if (_input.block.header.height % 100 === 0) {
      const round = Math.floor((_input.block.header.height - 1) / 100)
      const lotteryNumbers: ResultRng = await _input.reducerHandler.invoke('rng:getNumber', {
        min: 0,
        max: 99,
        height: _input.block.header.height - 1,
        type: 0,
        amount: 4,
        superSeed: _input.block.header.signature.toString('hex')
      });
      const roundData: Round = await getTicketRound(_input.stateStore, round)
      roundData.numbers = [...lotteryNumbers.numbers.map(num => num.number)]
      for (let i = 0; i < roundData.tickets.length; i++) {
        const ticket = <Ticket>await findTicketById(_input.stateStore, roundData.tickets[i]);
        ticket.correct = ticket.numbers.filter(number => roundData.numbers.indexOf(number) !== -1).length
        if (!roundData.results.find(res => res.correctNumbers === ticket.correct)) {
          roundData.results.push({
            correctNumbers: ticket.correct,
            wins: 1,
            price: BigInt(0)
          })
        } else {
          const resultIndex = roundData.results.findIndex(res => res.correctNumbers === ticket.correct)
          roundData.results[resultIndex].wins++;
        }
        if (ticket.correct > 1) {
          const winner: any = await _input.stateStore.account.get(ticket.owner)
          winner.lottery.prizes.push(ticket.id)
          await _input.stateStore.account.set(ticket.owner, winner)
        } else {
          console.log(123123123123123, ticket.id.toString('hex'))
          await archiveTicket(_input.stateStore, ticket.id, ticket.owner)
        }
        await updateTicket(_input.stateStore, ticket)
      }
      // calculate prices

      const fourCorrect = ((BigInt(roundData.safe) * BigInt(100)) / BigInt(2)) / BigInt(100)
      const threeCorrect = ((BigInt(roundData.safe) * BigInt(100)) / BigInt(3)) / BigInt(100)
      const twoCorrect = ((BigInt(roundData.safe) * BigInt(100)) / BigInt(10)) / BigInt(100)
      let charity = BigInt(roundData.safe)
      if (roundData.results.length > 0) {
        roundData.results = roundData.results.map(res => {
          const categoryPrice = res.correctNumbers === 4 ? fourCorrect : res.correctNumbers === 3 ? threeCorrect : res.correctNumbers === 2 ? twoCorrect : BigInt(0)
          charity -= categoryPrice
          return {
            ...res,
            price: ((categoryPrice * BigInt(100)) / BigInt(res.wins)) / BigInt(100)
          }
        })
        await _input.reducerHandler.invoke('token:credit', {
          address: Buffer.from("92668567a645cdac2cee05158a804bf0266229bb", 'hex'),
          amount: ((charity * BigInt(100)) / BigInt(10)) / BigInt(100)
        })
      }
      roundData.state = "resolved"
      await updateRound({stateStore: _input.stateStore, round: roundData})
      const nextRound: Round = await getTicketRound(_input.stateStore, roundData.round + 1)
      nextRound.safe = charity - ((charity * BigInt(100)) / BigInt(10)) / BigInt(100)
      await updateRound({stateStore: _input.stateStore, round: nextRound})

    }
    // Get any data from stateStore using block info, below is an example getting a generator
    // const generatorAddress = getAddressFromPublicKey(_input.block.header.generatorPublicKey);
    // const generator = await _input.stateStore.account.get<TokenAccount>(generatorAddress);
  }

  public async beforeTransactionApply(_input: TransactionApplyContext) {
    // Get any data from stateStore using transaction info, below is an example
    // const sender = await _input.stateStore.account.getOrDefault<TokenAccount>(_input.transaction.senderAddress);
  }

  public async afterTransactionApply(_input: TransactionApplyContext) {
    // Get any data from stateStore using transaction info, below is an example
    // const sender = await _input.stateStore.account.getOrDefault<TokenAccount>(_input.transaction.senderAddress);
  }

  public async afterGenesisBlockApply(_input: AfterGenesisBlockApplyContext) {
    // Get any data from genesis block, for example get all genesis accounts
    // const genesisAccoounts = genesisBlock.header.asset.accounts;
  }
}
