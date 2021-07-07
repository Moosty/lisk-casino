import { BaseAsset, ApplyAssetContext, } from 'lisk-sdk';
import {Game} from "../types";
import {endGame, isLastHand} from "../game";
import {updateGame} from "../reducers/games";

export class HoldAsset extends BaseAsset {
	public name = 'hold';
  public id = 2;

  // Define schema for asset
	public schema = {
    $id: 'poker/hold-asset',
		title: 'HoldAsset transaction asset for poker module',
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

		if (!game.playerHands[asset.hand]) {
			throw new Error(
				`Hand not found`
			)
		}

		if (game.open === 0) {
			throw new Error(
				`Game is closed`
			)
		}

		if (game.playerHands[asset.hand].state !== "undecided") {
			throw new Error(
				`Hand is already ${game.playerHands[asset.hand].state}`
			)
		}

		game.playerHands[asset.hand].state = "hold"

		if (isLastHand(game)) {
			await endGame(stateStore, reducerHandler, game, transaction)
		} else {
			await updateGame(stateStore, game)
		}
	}

}
