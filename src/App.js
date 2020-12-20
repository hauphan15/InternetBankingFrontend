import React from 'react';
import {Login} from './features/auth/Login';
import CustomerHomePage from './features/customer/HomePage';
import PrivateRoute from './features/auth/PrivateRoute';
import Header from './features/header/Header';
import History from './features/customer/History';
import Footer from './features/footer/Footer';
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
            <PrivateRoute path='/customer/history' component={History}/> 
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
