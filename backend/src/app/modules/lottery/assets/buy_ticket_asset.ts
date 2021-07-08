import { BaseAsset, ApplyAssetContext } from 'lisk-sdk';
import {addTicket, createEmptyTicket} from "../reducers/tickets";

export class BuyTicketAsset extends BaseAsset {
	public name = 'buyTicket';
  public id = 0;

  // Define schema for asset
	public schema = {
    $id: 'lottery/buyTicket-asset',
		title: 'BuyTicketAsset transaction asset for lottery module',
		type: 'object',
		required: ['quantity'],
		properties: {
    	quantity: {
    		fieldNumber: 1,
				dataType: "uint32",
				min: 1
			}
		},
  };

  public async apply({ asset, transaction, reducerHandler, stateStore }: ApplyAssetContext<{quantity: number}>): Promise<void> {
		const accountBalance = await reducerHandler.invoke('token:getBalance', {
			address: transaction.senderAddress,
		})
		const minRemainingBalance = await reducerHandler.invoke('token:getMinRemainingBalance')
		if (BigInt(accountBalance) - BigInt(minRemainingBalance) - BigInt(asset.quantity) * BigInt(500000000) < BigInt(0)) {
			throw new Error(
				`Balance to low`
			)
		}

		await reducerHandler.invoke('token:debit', {
			address: transaction.senderAddress,
			amount: BigInt(asset.quantity) * BigInt(500000000),
		})

		await reducerHandler.invoke('token:credit', {
			address: Buffer.from("92668567a645cdac2cee05158a804bf0266229bb", 'hex'),
			amount: BigInt(asset.quantity) * BigInt(50000000)
		})

		const account: any = await stateStore.account.get(transaction.senderAddress)
		for (let i = 1; i <= asset.quantity; i++) {
			const nonce = BigInt(account.lottery.nonce) + BigInt(i)
			const ticket: any = createEmptyTicket({address: transaction.senderAddress, nonce})
			ticket.playerAddress = transaction.senderAddress;
			ticket.nonce = nonce;
			ticket.height = stateStore.chain.lastBlockHeaders[0].height;
			await addTicket(stateStore, {reducerHandler, ticket})
		}
	}
}
