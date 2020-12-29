import { createSlice } from '@reduxjs/toolkit';
import config from '../../config/default.json';
import axios from 'axios';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        isSuccess: null,
        errorMessage: '',
        sendHistory: [],
        receiveHistory: [],
        receiverList: [],
        userProfile: {
            senderProfile: { fullName: '' },
            receiverProfile: { fullName: '' }
        },
        shownNotification: [],
        lastFiveHistory: []
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
        },
        setUserProfile: (state, action) => {
            state.userProfile.senderProfile.fullName = action.payload.senderProfile[0].FullName;
            state.userProfile.receiverProfile.fullName = action.payload.receiverProfile[0].FullName;
        },
        setShownNotification: (state, action) => {
            state.shownNotification = action.payload;
        },
        deleteNotification: (state, action) => {
            const index = state.shownNotification.findIndex(x => x.ID === action.payload);
            state.shownNotification.splice(index, 1);
        },
        setLastFiveHistory: (state, action) => {
            state.lastFiveHistory = action.payload;
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
    removeReceiver,
    setUserProfile,
    setShownNotification,
    deleteNotification,
    setLastFiveHistory
} = customerSlice.actions;

export const sendHistoryAsync = () => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/send-history`, { ID: localStorage.userID }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setSendHistory(response.data));
};

export const receiveHistoryAsync = () => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/receive-history`, { ID: localStorage.userID }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setReceiveHistory(response.data));
};

export const receiverListAsync = () => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/receiver-list`, { UserID: localStorage.userID }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setReceiverList(response.data));
};

export const addReceiverAsync = (number, nickName) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/add-receiver`, { UserID: localStorage.userID, ReceiverNumber: number, NickName: nickName }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setResponseResult(response.data));
    dispatch(addReceiver(response.data));
};

export const editReceiverAsync = (ID, newNickName) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/edit-receiver`, { ID: ID, NickName: newNickName }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setResponseResult(response.data));
    dispatch(editReceiver(response.data));
};

export const removeReceiverAsync = (ID) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/remove-receiver`, { ID: ID }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setResponseResult(response.data));
    dispatch(removeReceiver(response.data));
};

export const sendOTPCodeAsync = () => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/send-otp`, { ID: localStorage.userID }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setResponseResult(response.data));
};

export const transferMoneyAsync = (transactionInfo, otpCode) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/transfer-money`, transactionInfo, {
        headers: {
            'x-otp-code': otpCode,
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setResponseResult(response.data));
};

export const getUserProfileAsync = (senderId, receiverId) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/profile`, { SenderID: senderId, ReceiverID: receiverId }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setUserProfile(response.data));
};

export const getAllShownNotificationAsync = () => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/shown-notification`, { UserID: localStorage.userID }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setShownNotification(response.data));
};

export const deleteNotificationAsync = (ID) => async dispatch => {
    await axios.post(`${config.BaseURL}/customer/delete-notification`, { ID: ID }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });

    dispatch(deleteNotification(ID));
};

export const lastFiveHistoryAsync = () => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/customer/last-five-history`, { UserID: localStorage.userID }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });

    dispatch(setLastFiveHistory(response.data));
};

export default customerSlice.reducer;