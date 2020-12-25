import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customer/customerSlice';
import headerReducer from '../features/header/headerSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        customer: customerReducer,
        header: headerReducer
    },
});