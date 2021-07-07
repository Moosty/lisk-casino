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
import { DoubleAsset } from "./assets/double_asset";
import { HitAsset } from "./assets/hit_asset";
import { HoldAsset } from "./assets/hold_asset";
import { NewHandAsset } from "./assets/new_hand_asset";
import { SplitAsset } from "./assets/split_asset";
import { addGame, addGameToAccount, archiveGame, findGameById, getGameArchive, updateGame } from "./reducers/games";
import { updateJackpot } from "./reducers/jackpot";

export class PokerModule extends BaseModule {
  public accountSchema = {
    $id: 'poker/account',
    title: 'Poker games',
    type: 'object',
    required: ['games'],
    properties: {
      games: {
        fieldNumber: 1,
        type: 'array',
        items: {
          dataType: 'bytes',
        }
      }
    },
    default: {
      games: [],
    }
  }
  public actions = {
    // Example below
    // getBalance: async (params) => this._dataAccess.account.get(params.address).token.balance,
    // getBlockByID: async (params) => this._dataAccess.blocks.get(params.id),
  };
  public reducers = {
    findGameById: async (params, stateStore) => await findGameById(stateStore, params.id),
    updateGame: async (params, stateStore) => await updateGame(stateStore, params),
    addGame: async (params, stateStore) => await addGame(stateStore, {
      reducerHandler: params.reducerHandler,
      game: params.game
    }),
    getGameArchive: async (params, stateStore) => await getGameArchive(stateStore, params.playerAddress),
    addGameToAccount: async (params, stateStore) => await addGameToAccount(stateStore, params.gameId, params.playerAddress),
    archiveGame: async (params, stateStore) => await archiveGame(stateStore, params.gameId, params.playerAddress),
    updateJackpot: async (params, stateStore) => await updateJackpot(stateStore, params.reducerHandler, params.game)
  };
  public name = 'poker';
  public transactionAssets = [new NewHandAsset(), new HitAsset(), new HoldAsset(), new SplitAsset(), new DoubleAsset()];
  public events = [
    // Example below
    // 'poker:newBlock',
  ];
  public id = 8890;

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
