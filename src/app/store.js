import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customer/customerSlice';
import headerReducer from '../features/header/headerSlice';
import adminReducer from '../features/admin/adminSlice';
import employeeReducer from '../features/employee/employeeSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        customer: customerReducer,
        header: headerReducer,
        admin: adminReducer,
        employee: employeeReducer
    },
});