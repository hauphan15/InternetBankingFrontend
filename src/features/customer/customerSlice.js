import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        fullName: '',
        checkingAccountNumber: '',
        savingAccountNumber: '',
        accessToken: '',
        sendTransactionHistory: []
    },
    reducers: {
        setTransactionHistory: (state, action) => {
            state.sendTransactionHistory = action.payload;
        }
    },
});

export const { setTransactionHistory } = customerSlice.actions;

export const transactionHistoryAsync = () => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/send-history`, { ID: localStorage.userID });
    dispatch(setTransactionHistory(response.data));

};

export default customerSlice.reducer;