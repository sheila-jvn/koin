export interface Savings {
  customer: string;
  withdrawable: number;
  total: number;
}

export interface Mutation {
  type: "deposit" | "withdraw";
  amount: number;
  date: number;
  withdrawableAfter: number;
  withdrawableBefore: number;
  totalAfter: number;
  totalBefore: number;
}

export interface Aggregation {
  total: number;
  totalInCash: number;
}
