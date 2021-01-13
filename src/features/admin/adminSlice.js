import { createSlice } from '@reduxjs/toolkit';
import config from '../../config/default.json';
import axios from 'axios';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isSuccess: null,
        errorMessage: '',
        employeeList: [],
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
        }
    },
});

export const { setEmployeeList, setResponseResult, resetResponseResult } = adminSlice.actions;

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
    console.log(response.data);
    dispatch(setResponseResult(response.data));
};

export default adminSlice.reducer;