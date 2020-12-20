import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: null,
        userID: null,
        permission: '',
        username: '',
        accessToken: ''
    },
    reducers: {
        setUserInfo: (state, action) => {
            if (action.payload.authenticated) {
                state.loggedIn = true;
                state.userID = action.payload.userInfo.ID;
                state.permission = action.payload.userInfo.permission;
                state.username = action.payload.userInfo.UserLogin;
                state.accessToken = action.payload.accessToken;
                localStorage.setItem('access_token', action.payload.accessToken);
                localStorage.setItem('username', action.payload.userInfo.UserLogin);
                localStorage.setItem('userID', action.payload.userInfo.ID);
            } else {
                state.loggedIn = false;
                state.accessToken = '';
                localStorage.setItem('access_token', '');
                localStorage.setItem('username', '');
                localStorage.setItem('userID', '');
            }
        },
        logout: state => {
            state.loggedIn = false;
            state.accessToken = '';
            state.userID = null;
            state.permission = '';
            state.username = '';
            localStorage.setItem('access_token', '');
        }
    },
});

export const { logout, setUserInfo } = authSlice.actions;

export const login = (username, password) => async dispatch => {
    const response = await axios.post(`http://localhost:3001/login`, { username: username, password: password });
    dispatch(setUserInfo(response.data));
};

export default authSlice.reducer;