import { BaseAsset, ApplyAssetContext } from 'lisk-sdk';
import {archivePrice, archiveTicket, findTicketById, getTicketRound, updateTicket} from "../reducers/tickets";

export class ClaimPriceAsset extends BaseAsset {
	public name = 'claimPrice';
  public id = 1;

  // Define schema for asset
	public schema = {
    $id: 'lottery/claimPrice-asset',
		title: 'ClaimPriceAsset transaction asset for lottery module',
		type: 'object',
		required: ['ticket'],
		properties: {
    	ticket: {
    		dataType: 'bytes',
				fieldNumber: 1,
			}
		},
  };

  public async apply({ asset, transaction, stateStore, reducerHandler }: ApplyAssetContext<{ticket: Buffer}>): Promise<void> {
  	// todo check if won. and how much
		const account: any = await stateStore.account.get(transaction.senderAddress)
		if (account.lottery.prizes.findIndex(price => asset.ticket.equals(price)) === -1) {
			throw new Error(`Price not found`)
		}
		const ticket: any = await findTicketById(stateStore, asset.ticket)
		if (!ticket) {
			throw new Error(`Ticket not found`)
		}
		if (ticket.state === 'resolved') {
			throw new Error(`Ticket is already resolved`)
		}
		if (ticket.correct < 2) {
			throw new Error(`Ticket won no price`)
		}
		const round = await getTicketRound(stateStore, ticket.round)
		const result: any = round.results.find(res => res.correctNumbers === ticket.correct)
		if (!result) {
			throw new Error(`Result not found`)
		}
		await reducerHandler.invoke('token:credit', {
			address: transaction.senderAddress,
			amount: result.price,
		})
		ticket.state = "resolved"
		await updateTicket(stateStore, ticket)
		await archivePrice(stateStore, ticket)
		await archiveTicket(stateStore, ticket.id, transaction.senderAddress)
	}
}
