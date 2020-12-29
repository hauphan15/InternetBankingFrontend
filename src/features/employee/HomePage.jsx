import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchZone from './filter';
import ListCustomer from './list-customer';
import {getlistCustomerAsync} from './employeeSlice';
import './css/em.css';
function HomePage() {
    const listCustomer = useSelector(state => state.employee.listCustomer);
    const dispatch = useDispatch();
    function receiveFilter(filter) {
        dispatch(getlistCustomerAsync(filter));
    }
    return (
        <div className="container-fluid" style={{padding: "0 100px 0 100px"}}>
            <SearchZone sendFilter={receiveFilter}/>
            <ListCustomer list={listCustomer} />
        </div>
    );
}

export default HomePage;