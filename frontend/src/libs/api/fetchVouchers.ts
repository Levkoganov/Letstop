import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {IPurchaseVoucherInput} from '../../../types';

export const fetchAllVouchers = createAsyncThunk(
  'vouchers/fetchAllVouchers',
  async () => {
    const {data} = await axios('vouchers');
    return data;
  }
);
export const fetchGetUserPurchasedVouchers = createAsyncThunk(
  'vouchers/fetchGetUserPurchasedVouchers',
  async (id: string) => {
    const {data} = await axios(`purchase/users/${id}/vouchers`);
    return data;
  }
);

export const fetchBuyVoucher = createAsyncThunk(
  'vouchers/fetchBuyVoucher',
  async (payload: IPurchaseVoucherInput) => {
    console.log(payload);
    const {data} = await axios.post('purchase', payload);
    return data;
  }
);
