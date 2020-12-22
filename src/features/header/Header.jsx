import React,{useState} from 'react';
import {Navbar,Nav, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../auth/authSlice';

function Header() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);

    function handleLogout(){
        dispatch(logout());
    }

    return (
        <div style={{backgroundColor:"white"}}>
            <Container style={{paddingLeft:"0px", paddingRight:"0px"}}>
                {localStorage.access_token !=='' || loggedIn===true
                ?<Navbar expand="lg">
                    <Navbar.Brand style={{color:"#24305E", fontSize:"100", fontWeight:"700"}} href="/customer/homepage">
                        Internet Banking
                    </Navbar.Brand>
                        <Nav className="mr-auto" style={{fontWeight:"500"}}>
                                <Nav.Link style={{color:"#24305E"}} href="/customer/homepage">
                                    Overview
                                </Nav.Link>
                                <Nav.Link style={{color:"#24305E"}} href="#Account">
                                    Account
                                </Nav.Link>
                                <Nav.Link style={{color:"#24305E"}} href="#Transaction">
                                    Transaction
                                </Nav.Link>
                                <Nav.Link style={{color:"#24305E"}} href="/customer/history">
                                    History
                                </Nav.Link>
                                <Nav.Link style={{color:"#24305E"}} href="/customer/receiver">
                                    Receiver List
                                </Nav.Link>
                        </Nav>
                        <Nav style={{marginLeft:"50px"}} className="justify-content-end">
                                <Nav.Link style={ {color:"#24305E"}} 
                                    href="/customer/profile">
                                        <i style={{marginRight:"5px"}} className="fas fa-user"></i>{localStorage.username}
                                    </Nav.Link>
                                <Nav.Link style={  {color:"#24305E"}} 
                                    href="/customer/profile">
                                        <i style={{marginRight:"5px"}}  className="fas fa-bell"></i>Notification
                                    </Nav.Link>
                                <Nav.Link style={{color:"#24305E"}} 
                                    href="/" 
                                    onClick={handleLogout}>
                                        <i style={{marginRight:"5px"}} className="fas fa-sign-out-alt"></i>
                                    Sign out
                                </Nav.Link>
                        </Nav>
                </Navbar>
                :null}
            </Container>
        </div>
    );
}

export default Header;