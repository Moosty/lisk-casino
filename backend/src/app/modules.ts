import { Application } from 'lisk-sdk';
import { PokerModule } from "./modules/poker/poker_module";
import { RngModule } from "./modules/rng/rng_module";

export const registerModules = (app: Application): void => {
    app.registerModule(RngModule);
    app.registerModule(PokerModule);
};
