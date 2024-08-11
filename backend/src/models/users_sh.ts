import { Schema, model } from "mongoose";
import { IUsers } from "../../types";
import { reqString, defaultNumber } from "../constants";

const userSchema = new Schema<IUsers>(
  {
    name: reqString,
    password: reqString,
    balance: defaultNumber,
    purchased_vouchers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Voucher",
      },
    ],
  },
  { timestamps: true }
);

export default model<IUsers>("User", userSchema);
