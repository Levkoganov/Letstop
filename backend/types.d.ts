import { ObjectId } from "mongoose";

export interface IUsers {
  name: string;
  password: string;
  balance: number;
  purchased_vouchers: ObjectId[];
}

export interface IVoucher {
  amount: number;
  cost: number;
  company: string;
}

export interface IPurchase {
  userId: number;
  voucherId: number;
}

export interface IUpdateFields {
  $set?: {
    amount?: number;
    cost?: number;
    company?: string;
  };
}
