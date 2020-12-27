import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = employeeSlice.actions;

export const incrementAsync = amount => dispatch => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, 3000);
};

export default employeeSlice.reducer;