
export interface Game {
  open: number;
  wager: BigInt;
  playerHands: Array<PlayerHands>;
  houseCards: Array<number>;
  playerAddress: string;
  id: string;
  height: number;
}

export interface PlayerHands {
  id: number;
  state: string;
  cards: Array<number>;
  double: boolean;
  count: number;
}

export interface JackpotType {
  jackpot: BigInt;
  luckyNumber: number;
  history: Array<JackpotHistory>;
}

export interface JackpotHistory {
  nonce: number;
  winner: any;
  id: any;
  amount: any;
  height: number;
}
