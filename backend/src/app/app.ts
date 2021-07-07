import {Application, DPoSModule, KeysModule, PartialApplicationConfig, SequenceModule, TokenModule} from 'lisk-sdk';
import { registerModules } from './modules';
import { registerPlugins } from './plugins';
import {SprinklerModule} from "@moosty/lisk-sprinkler";

export const getApplication = (
	genesisBlock: Record<string, unknown>,
	config: PartialApplicationConfig,
): Application => {
	const app = new Application(genesisBlock, config);

	// @ts-ignore
	app._registerModule(SprinklerModule, false);
	// @ts-ignore
	app._registerModule(TokenModule, false);
	// @ts-ignore
	app._registerModule(SequenceModule, false);
	// @ts-ignore
	app._registerModule(KeysModule, false);
	// @ts-ignore
	app._registerModule(DPoSModule, false);
	registerModules(app);
	registerPlugins(app);

	return app;
};
