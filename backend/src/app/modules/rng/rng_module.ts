import { BaseModule, BeforeBlockApplyContext, StateStore } from 'lisk-sdk';
import Prando from 'prando';

export interface Number {
	id: number;
	number: number;
}
export type Numbers = Array<Number>;
export interface ResultRng {
	status: boolean;
	message?: string;
	numbers?: Numbers;
}

export class RngModule extends BaseModule {
	public actions = {};
	public reducers = {
		getNumber: async (
			params: Record<string, unknown>,
			stateStore: StateStore,
		): Promise<ResultRng> => {
			const { height, min, max, amount, type = 0, superSeed } = params;
			let seed = await stateStore.chain.get(`RNG:${height}`);
			if (!seed) {
				return {
					status: false,
					message: `Seed not found for height ${height}`,
				};
			}
			if (superSeed) {
				// @ts-ignore
				seed += superSeed
			}
			const rng: Prando = new Prando(seed.toString('hex'));
			if (type === 0) {
				const numbers: Numbers = [];
				const total = amount as number;
				for (let i = 0; i < total; i++) {
					numbers.push({id: i, number: rng.nextInt(min as number, max as number)})
				}
				return {
					status: true,
					message: `Seed: ${seed}, min: ${min}, max: ${max}, amount: ${amount}`,
					numbers,
				};
			}
			return {
				status: false,
				message: `Didn't catch any prng number`,
			};
		},
	};
	public name = 'rng';
	public transactionAssets = [];
	public events = [];
	public id = 8888;

	public async beforeBlockApply({ block, stateStore }: BeforeBlockApplyContext): Promise<void> {
		// store seed in state store by height
		await stateStore.chain.set(`RNG:${block.header.height}`, block.header.id);
	}

}
