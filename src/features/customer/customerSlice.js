import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        isSuccess: null,
        errorMessage: '',
        sendHistory: [],
        receiveHistory: [],
        receiverList: []
    },
    reducers: {
        resetResponseResult: (state) => {
            state.isSuccess = false;
            state.errorMessage = '';
        },
        setResponseResult: (state, action) => {
            if (action.payload.success === true) {
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
                state.errorMessage = action.payload.message;
            }
        },
        setSendHistory: (state, action) => {
            state.sendHistory = action.payload;
        },
        setReceiveHistory: (state, action) => {
            state.receiveHistory = action.payload;
        },
        setReceiverList: (state, action) => {
            state.receiverList = action.payload;
        },
        addReceiver: (state, action) => {
            //update state.receiverList
        },
        editReceiver: (state, action) => {
            //update state.receiverList
        },
        removeReceiver: (state, action) => {
            //update state.receiverList
        }
    },
});

export const {
    resetResponseResult,
    setResponseResult,
    setSendHistory,
    setReceiveHistory,
    setReceiverList,
    addReceiver,
    editReceiver,
    removeReceiver
} = customerSlice.actions;

export const sendHistoryAsync = () => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/send-history`, { ID: localStorage.userID });
    dispatch(setSendHistory(response.data));
};

export const receiveHistoryAsync = () => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/receive-history`, { ID: localStorage.userID });
    dispatch(setReceiveHistory(response.data));
};

export const receiverListAsync = () => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/receiver-list`, { UserID: localStorage.userID });
    dispatch(setReceiverList(response.data));
};

export const addReceiverAsync = (number, nickName) => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/add-receiver`, { UserID: localStorage.userID, ReceiverNumber: number, NickName: nickName });
    dispatch(setResponseResult(response.data));
    dispatch(addReceiver(response.data));
};

export const editReceiverAsync = (ID, newNickName) => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/edit-receiver`, { ID: ID, NickName: newNickName });
    dispatch(setResponseResult(response.data));
    dispatch(editReceiver(response.data));
};

export const removeReceiverAsync = (ID) => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/remove-receiver`, { ID: ID });
    dispatch(setResponseResult(response.data));
    dispatch(removeReceiver(response.data));
};

export const sendOTPCodeAsync = () => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/send-otp`, { ID: localStorage.userID });
    dispatch(setResponseResult(response.data));
};

export const transferMoneyAsync = (transactionInfo, otpCode) => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/transfer-money`, transactionInfo, {
        headers: {
            'x-otp-code': otpCode
        }
    });
    dispatch(setResponseResult(response.data));
};

export default customerSlice.reducer;