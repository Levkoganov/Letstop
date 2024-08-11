import {createSlice} from '@reduxjs/toolkit';
import {
  fetchAllVouchers,
  fetchGetUserPurchasedVouchers,
} from '../libs/api/fetchVouchers';
import {IVoucherSlice} from '../../types';

const initialState: IVoucherSlice = {
  allVouchers: [],
  myVouchers: [],
  isLoading: true,
};

export const voucherSlice = createSlice({
  name: 'vouchers',
  initialState,
  reducers: {
    updateVouchersData: (state, action) => {
      const {voucherId, amount} = action.payload;

      // Find the voucher by its ID
      const voucher = state.allVouchers.find(v => v._id === voucherId);
      if (voucher) {
        voucher.amount = amount;
      }
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchAllVouchers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllVouchers.fulfilled, (state, action) => {
      state.allVouchers = [...action.payload];
      state.isLoading = false;
    });

    builder.addCase(fetchGetUserPurchasedVouchers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchGetUserPurchasedVouchers.fulfilled,
      (state, action) => {
        state.myVouchers = [...action.payload.purchased_vouchers];
        state.isLoading = false;
      }
    );
  },
});

export const {updateVouchersData} = voucherSlice.actions;
export default voucherSlice.reducer;
