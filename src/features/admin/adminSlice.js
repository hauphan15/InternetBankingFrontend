import { createSlice } from '@reduxjs/toolkit';
import config from '../../config/default.json';
import axios from 'axios';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isSuccess: null,
        errorMessage: '',
        employeeList: [],
        allHistory: [],
        currentMonthHistory: []
    },
    reducers: {
        resetResponseResult: (state) => {
            state.isSuccess = null;
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
        setEmployeeList: (state, action) => {
            state.employeeList = action.payload;
        },
        setAllHistory: (state, action) => {
            state.allHistory = action.payload;
        },
        setCurrentMonthHistory: (state, action) => {
            state.currentMonthHistory = action.payload;
        }
    },
});

export const {
    setEmployeeList,
    setResponseResult,
    resetResponseResult,
    setAllHistory,
    setCurrentMonthHistory
} = adminSlice.actions;

export const getEmployeeListAsync = () => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/admin/employee-list`, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setEmployeeList(response.data));
};

export const addEmployeeAsync = (registerInfo) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/admin/add-employee`, registerInfo, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setResponseResult(response.data));
};

export const removeEmployeeAsync = (id) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/admin/remove-employee`, { ID: id }, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });

    dispatch(setResponseResult(response.data));
};

export const getAllHistoryAsync = (id) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/admin/all-history`, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setAllHistory(response.data));
};

export const getCurrentMonthHistoryAsync = (id) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/admin/current-month-history`, {
        headers: {
            'x-access-token': localStorage.access_token
        }
    });
    dispatch(setCurrentMonthHistory(response.data));
};
export default adminSlice.reducer;