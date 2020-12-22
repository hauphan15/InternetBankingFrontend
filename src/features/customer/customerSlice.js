import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        isSuccess: null,
        errorMessage: '',
        fullName: '',
        checkingAccountNumber: '',
        savingAccountNumber: '',
        accessToken: '',
        sendHistory: [],
        receiveHistory: [],
        receiverList: []
    },
    reducers: {
        setSendHistory: (state, action) => {
            state.sendHistory = action.payload;
        },
        setReceiveHistory: (state, action) => {
            state.receiveHistory = action.payload;
        },
        setReceiverList: (state, action) => {
            state.receiverList = action.payload;
        },
        setAddReceiverResult: (state, action) => {
            if (action.payload.success === true) {
                state.isSuccess = true;
            } else {
                state.isSuccess = false;
                state.errorMessage = action.payload.message;
            }
        }
    },
});

export const { setSendHistory, setReceiveHistory, setReceiverList, setAddReceiverResult } = customerSlice.actions;

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
    dispatch(setAddReceiverResult(response.data));
};


export default customerSlice.reducer;