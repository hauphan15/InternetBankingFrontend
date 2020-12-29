import React from 'react';
import {Login} from './features/auth/Login';
import CustomerHomePage from './features/customer/HomePage';
import AdminHomePage from './features/admin/HomePage';
import EmployeeHomePage from './features/employee/HomePage';
import PrivateRoute from './features/auth/PrivateRoute';
import Header from './features/header/Header';
import History from './features/customer/History';
import Footer from './features/footer/Footer';
import Receiver from './features/customer/Receiver';
import Transaction from './features/customer/Transaction';
import Notification from './features/customer/Notification';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App" style={{backgroundColor:"#F2F3F5"}}>
      <Header/>
        <Router>
          <Switch>
            <PrivateRoute path='/customer/homepage' component={CustomerHomePage}/> 
            <PrivateRoute path='/customer/transaction' component={Transaction}/>
            <PrivateRoute path='/customer/history' component={History}/> 
            <PrivateRoute path='/customer/receiver' component={Receiver}/> 
            <PrivateRoute path='/customer/notification' component={Notification}/>
            

            <PrivateRoute path='/admin/homepage' component={AdminHomePage}/>

            <PrivateRoute path='/employee/homepage' component={EmployeeHomePage}/>
            
            <Route path="/"> 
                <Login /> 
            </Route>

          </Switch>
        </Router>
        <Footer/>
    </div>
  );
}

export default App;
