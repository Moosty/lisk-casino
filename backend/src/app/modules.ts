import { Application } from 'lisk-sdk';
import { DiceModule } from "./modules/dice/dice_module";
import { LotteryModule } from "./modules/lottery/lottery_module";
import { PokerModule } from "./modules/poker/poker_module";
import { RngModule } from "./modules/rng/rng_module";

export const registerModules = (app: Application): void => {
    app.registerModule(RngModule);
    app.registerModule(PokerModule);
    app.registerModule(DiceModule);
    app.registerModule(LotteryModule);
};
