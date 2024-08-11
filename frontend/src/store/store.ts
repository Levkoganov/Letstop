import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import voucherSlice from './voucherSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    vouchers: voucherSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
