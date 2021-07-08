import { BaseAsset, ApplyAssetContext } from 'lisk-sdk';
import {Game} from "../types";
import {updateGame} from "../reducers/games";
import {blackjackDeck} from "../constants";
import {getHandCount} from "../game";
import {ResultRng} from "../../rng/rng_module";

export class SplitAsset extends BaseAsset {
	public name = 'split';
  public id = 3;

  // Define schema for asset
	public schema = {
    $id: 'poker/split-asset',
		title: 'SplitAsset transaction asset for poker module',
		type: 'object',
		required: ['gameId','hand'],
		properties: {
			gameId: {
				dataType: "bytes",
				fieldNumber: 1,
			},
			hand: {
				dataType: "uint32",
				fieldNumber: 2,
			}
		},
  };

	public async apply({ asset, transaction, stateStore, reducerHandler }: ApplyAssetContext<{gameId: string, hand: number}>): Promise<void> {
		const game: Game = await reducerHandler.invoke('poker:findGameById', {id: asset.gameId})
		const account = await stateStore.account.get(transaction.senderAddress)
		if (!game) {
			throw new Error(
				`Game not found`
			)
		}

		if (!transaction.senderAddress.equals(Buffer.from(game.playerAddress))) {
			throw new Error(
				`This is not your game`
			)
		}

		if (game.open === 0) {
			throw new Error(
				`Game is closed`
			)
		}

		if (!game.playerHands[asset.hand]) {
			throw new Error(
				`Hand not found`
			)
		}

		if (game.playerHands[asset.hand].state !== "undecided") {
			throw new Error(
				`Hand is already ${game.playerHands[asset.hand].state}`
			)
		}

		if (blackjackDeck[game.playerHands[asset.hand].cards[0]] !== blackjackDeck[game.playerHands[asset.hand].cards[1]]) {
			throw new Error(
				`This hand can't be split`
			)
		}
		const accountBalance = await reducerHandler.invoke('token:getBalance', {
			address: transaction.senderAddress,
		})
		const minRemainingBalance = await reducerHandler.invoke('token:getMinRemainingBalance')
		if (BigInt(accountBalance) - BigInt(minRemainingBalance) - BigInt(game.wager) < BigInt(0)) {
			throw new Error(
				`Balance to low`
			)
		}

		const randomCards: ResultRng = await reducerHandler.invoke('rng:getNumber', {
			min: 0,
			max: 51,
			height: stateStore.chain.lastBlockHeaders[0].height,
			type: 0,
			amount: 2,
			superSeed: game.id,
		});

		game.playerHands.push({
			id: game.playerHands[game.playerHands.length - 1].id + 1,
			state: "undecided",
			cards: [
				game.playerHands[asset.hand].cards[1],
				randomCards.numbers[0].number,
			],
			double: false,
			count: getHandCount([game.playerHands[asset.hand].cards[1], randomCards.numbers[0].number])
		})

		game.playerHands[asset.hand].cards = [game.playerHands[asset.hand].cards[0], randomCards.numbers[1].number]
		game.playerHands[asset.hand].count = getHandCount(game.playerHands[asset.hand].cards)


		try {
			reducerHandler.invoke("token:debit", {
				address: transaction.senderAddress,
				amount: BigInt(game.wager)
			})
		} catch(e) {
			throw new Error(
				`Balance to low`
			)
		}

		await updateGame(stateStore, game)
	}
}
