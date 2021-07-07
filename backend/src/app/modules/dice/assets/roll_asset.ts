import { BaseAsset, ApplyAssetContext, ValidateAssetContext } from 'lisk-sdk';

export class RollAsset extends BaseAsset {
	public name = 'roll';
  public id = 0;

  // Define schema for asset
	public schema = {
    $id: 'dice/roll-asset',
		title: 'RollAsset transaction asset for dice module',
		type: 'object',
		required: [],
		properties: {},
  };

  public validate({ asset }: ValidateAssetContext<{}>): void {
    // Validate your asset
  }

	// eslint-disable-next-line @typescript-eslint/require-await
  public async apply({ asset, transaction, stateStore }: ApplyAssetContext<{}>): Promise<void> {
		throw new Error('Asset "roll" apply hook is not implemented.');
	}
}
