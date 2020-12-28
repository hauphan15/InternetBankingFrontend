import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        success: true,
        message: '',
        listCustomer: [],
        customerProfile: {},
        customerCheckingAccount: {},
        customerSavingAccount: {},
        customerSendTransactionHistory: [],
        customerReceiverTransactionHistory: [],
    },
    reducers: {
        setlistCustomer: (state, action) => {
            state.listCustomer = action.payload.listCustomer;
            state.message = action.payload.message;
            state.success = true;
        },
        setCustomerProfile: (state, action) => {
            state.success = action.payload.success;
            state.message = action.payload.message;
            state.customerProfile = action.payload.customer[0];
            state.customerCheckingAccount = action.payload.customer[1];
            state.customerSavingAccount = action.payload.customer[2];
            state.customerSendTransactionHistory = action.payload.customer[3];
            state.customerReceiverTransactionHistory = action.payload.customer[4];
        }
    }
});

export const { setlistCustomer, setCustomerProfile } = employeeSlice.actions;

export const getlistCustomerAsync = filter => async dispatch => {
    const response = await axios.post('http://localhost:3001/employee/get-customers', filter);
    //console.log(response);
    dispatch(setlistCustomer(response.data));
};

export const getCustomerProfileAsync = ID => async dispatch => {
    const response = await axios.post('http://localhost:3001/employee/get-customer', {ID: ID});
    //console.log(response.data);
    dispatch(setCustomerProfile(response.data));
};

export default employeeSlice.reducer;