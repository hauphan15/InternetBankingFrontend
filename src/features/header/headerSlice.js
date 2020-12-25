import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        notification: [],
    },
    reducers: {
        seenAllNotification: (state) => {
            state.notification = [];
        },
        getAllNotification: (state, action) => {
            state.notification = action.payload;
        }
    },
});

export const { seenAllNotification, getAllNotification } = headerSlice.actions;

export const seenAllNotificationAsync = () => async dispatch => {
    await axios.post(`http://localhost:3001/customer/seen-all-notification`, { UserID: localStorage.userID });
    dispatch(seenAllNotification());
};

export const getAllNotificationAsync = () => async dispatch => {
    const response = await axios.post(`http://localhost:3001/customer/notification`, { UserID: localStorage.userID });
    dispatch(getAllNotification(response.data));
};


export default headerSlice.reducer;