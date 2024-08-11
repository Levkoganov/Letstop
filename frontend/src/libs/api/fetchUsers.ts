import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ILogInPayload} from '../../../types';

export const fetchLoggedInUser = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (payload: ILogInPayload) => {
    const {data} = await axios.post('users/login', payload);
    return data;
  }
);
