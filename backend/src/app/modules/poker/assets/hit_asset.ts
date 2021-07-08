import { BaseAsset, ApplyAssetContext } from 'lisk-sdk';
import {Game} from "../types";
import {endGame, getHandCount, isLastHand} from "../game";
import {updateGame} from "../reducers/games";
import {ResultRng} from "../../rng/rng_module";

export class HitAsset extends BaseAsset {
	public name = 'hit';
  public id = 1;

  // Define schema for asset
	public schema = {
    $id: 'poker/hit-asset',
		title: 'HitAsset transaction asset for poker module',
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

		if (getHandCount(game.playerHands[asset.hand].cards) >= 21) {
			throw new Error(
				`You can't hit a card with this hand`
			)
		}

		const randomCard: ResultRng = await reducerHandler.invoke('rng:getNumber', {
			min: 0,
			max: 51,
			height: stateStore.chain.lastBlockHeaders[0].height,
			type: 0,
			amount: 1,
			superSeed: game.id,
		});

		game.playerHands[asset.hand].cards.push(randomCard.numbers[0].number)
		game.playerHands[asset.hand].count = getHandCount(game.playerHands[asset.hand].cards)
		if (game.playerHands[asset.hand].count >= 21) {
			game.playerHands[asset.hand].state = "hold"
		}

		if (isLastHand(game)) {
			await endGame(stateStore, reducerHandler, game, transaction)
		} else {
			await updateGame(stateStore, game)
		}
	}
}
