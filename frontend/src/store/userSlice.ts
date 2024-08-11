import {createSlice} from '@reduxjs/toolkit';
import {fetchLoggedInUser} from '../libs/api/fetchUsers';
import {IUserSlice} from '../../types';

const initialState: IUserSlice = {
  _id: '',
  name: '',
  balance: 0,
  purchased_vouchers: [],
  message: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.balance = action.payload.balance;
      state.purchased_vouchers = [...action.payload.purchased_vouchers];
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchLoggedInUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
      state;
      return {
        ...state,
        ...action.payload,
        message: null,
        isLoading: false,
      };
    });
  },
});

export const {updateUserData} = userSlice.actions;
export default userSlice.reducer;
