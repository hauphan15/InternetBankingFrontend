import React from 'react'
import { Redirect, Route } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        (localStorage.access_token === '')
        ? <Redirect to='/'/>
        : <Component {...props}/>
    )} />
  )

export default PrivateRoute