export interface IVoucher {
  _id: string;
  amount: number | null;
  cost: number | null;
  company: string;
}

export interface IVoucherSlice {
  allVouchers: IVoucher[];
  myVouchers: IVoucher[];
  isLoading: boolean;
}

export interface IUserSlice {
  _id: string;
  name: string;
  balance: number;
  purchased_vouchers: IVoucher[];
  message: null | string;
  isLoading: boolean;
}

export interface IPurchaseVoucherInput {
  userId: string;
  voucherId: string;
}

export type RootStackParamList = {
  SignIn: undefined;
  Register: undefined;
  Home: undefined;
  PurchaseVoucher: undefined;
  MyVoucher: undefined;
};

export interface ILogInPayload {
  name: string;
  password: string;
}

export type ButtonType = 'PRIMARY' | 'TERTIARY'; // Define the possible types
