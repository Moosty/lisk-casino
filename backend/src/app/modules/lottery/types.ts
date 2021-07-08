
export interface Round {
  round: number;
  numbers: Array<number>;
  state: string;
  tickets: Array<Buffer>;
  results: Array<LotteryResults>;
  safe: BigInt;
}
export interface LotteryResults {
  correctNumbers: number;
  wins: number;
  price: BigInt;
}

export interface Ticket {
  round: number;
  owner: Buffer;
  nonce: BigInt;
  id: Buffer;
  state: string;
  numbers: Array<number>;
  correct: number;
}
