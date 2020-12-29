import { createSlice } from '@reduxjs/toolkit';
import config from '../../config/default.json';
import axios from 'axios';

export const authSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            if (action.payload.authenticated) {
                state.loggedIn = true;
                localStorage.setItem('access_token', action.payload.accessToken);
                localStorage.setItem('username', action.payload.userInfo.UserLogin);
                localStorage.setItem('userID', action.payload.userInfo.ID);
                localStorage.setItem('permission', action.payload.userInfo.Permission);
                if (action.payload.userInfo.Permission === 'customer') {
                    localStorage.setItem('checkingAccountNumber', action.payload.checkingAccountInfo.AccountNumber);
                    if (action.payload.savingAccountInfo.length > 0) {
                        localStorage.setItem('savingAccountNumber', action.payload.savingAccountInfo.AccountNumber);
                    }
                }
            } else {
                state.loggedIn = false;
                localStorage.setItem('access_token', '');
            }
        },
        logout: state => {
            state.loggedIn = false;
            localStorage.setItem('permission', '');
            localStorage.setItem('access_token', '');
            localStorage.setItem('username', '');
            localStorage.setItem('userID', '');
            localStorage.setItem('checkingAccountNumber', '');
            localStorage.setItem('savingAccountNumber', '');
        }
    },
});

export const { logout, setUserInfo, seenAllNotification } = authSlice.actions;

export const login = (username, password) => async dispatch => {
    const response = await axios.post(`${config.BaseURL}/login`, { username: username, password: password });
    console.log(response.data);
    dispatch(setUserInfo(response.data));
};

export default authSlice.reducer;