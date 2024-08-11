import { Schema, model } from "mongoose";
import { IVoucher } from "../../types";
import { reqString, reqNumber } from "../constants";

const voucherSchema = new Schema<IVoucher>(
  {
    amount: reqNumber,
    cost: reqNumber,
    company: reqString,
  },
  { timestamps: true }
);

export default model<IVoucher>("Voucher", voucherSchema);
