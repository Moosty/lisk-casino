import { BaseAsset, ApplyAssetContext } from 'lisk-sdk';
import {addGame, createEmptyGame, findGameById} from "../reducers/games";

export class NewHandAsset extends BaseAsset {
	public name = 'newHand';
  public id = 0;

  // Define schema for asset
	public schema = {
    $id: 'poker/newHand-asset',
		title: 'NewHandAsset transaction asset for poker module',
		type: 'object',
		required: [
			'wager'
		],
		properties: {
			wager: {
				fieldNumber: 1,
				dataType: "uint64",
			},
		},
  };

  public async apply({ asset, transaction, stateStore, reducerHandler }: ApplyAssetContext<{wager: string}>): Promise<void> {
		const newGame = createEmptyGame(
			{
				wager: asset.wager,
				address: transaction.senderAddress,
				nonce: transaction.nonce,
			}
		)
		if (!newGame || !newGame.id) {
			throw new Error(
				`Game failed to created`
			)
		}
		await addGame(stateStore, {reducerHandler, game: {...newGame, playerAddress: transaction.senderAddress, height: stateStore.chain.lastBlockHeaders[0].height}})
		const storedGame = await findGameById(stateStore, newGame.id)
		if (!storedGame) {
			throw new Error(
				`Game failed to save`
			)
		}
		await reducerHandler.invoke("token:debit", {
			address: transaction.senderAddress,
			amount: asset.wager,
		})
	}
}
