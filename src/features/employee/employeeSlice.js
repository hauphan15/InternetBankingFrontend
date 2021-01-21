import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        createSuccess: true,
        loadUserSuccess: true,
        success: true,
        message: '',
        listCustomer: [],
        customerProfile: {},
        customerCheckingAccount: {},
        customerSavingAccount: {},
        customerSendTransactionHistory: [],
        customerReceiverTransactionHistory: [],
        statusHistory : false,
    },
    reducers: {
        setlistCustomer: (state, action) => {
            state.listCustomer = action.payload.listCustomer;
            state.message = action.payload.message;
            state.loadUserSuccess = true;
        },
        setCustomerProfile: (state, action) => {
            state.success = action.payload.success;
            state.message = action.payload.message;
            state.customerProfile = action.payload.customer[0];
            state.customerCheckingAccount = action.payload.customer[1];
            state.customerSavingAccount = action.payload.customer[2];
            state.customerSendTransactionHistory = action.payload.customer[3];
            state.customerReceiverTransactionHistory = action.payload.customer[4];
            state.statusHistory = true;
        },
        reSetTransactionHistory: (state) => {
            state.statusHistory = false;
        }
    }
});

export const { setlistCustomer, setCustomerProfile, reSetTransactionHistory } = employeeSlice.actions;

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
export const resetTransaction = () => async dispatch => {
    dispatch(reSetTransactionHistory());
};

export default employeeSlice.reducer;