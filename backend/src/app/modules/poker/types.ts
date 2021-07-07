
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
}
