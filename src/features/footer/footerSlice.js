import { createSlice } from '@reduxjs/toolkit';

export const footerSlice = createSlice({
    name: 'footer',
    initialState: {

    },
    reducers: {},
});

export const { setTransactionHistory } = footerSlice.actions;

export default footerSlice.reducer;