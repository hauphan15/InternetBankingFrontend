import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../auth/authSlice';

function Header() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);

    function handleLogout(){
        dispatch(logout());
    }

    return (
        <div>
            {localStorage.access_token !=='' || loggedIn===true
            ?<Navbar bg="dark" style={{backgroundColor:"black"}} expand="lg">
                <Navbar.Brand style={{color:"white", fontSize:"100"}} href="/customer/homepage">Internet Banking</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav>
                            <Nav.Link style={{color:"white"}} href="/customer/homepage">Overview</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="#Account">Account</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="#Transaction">Transaction</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="/customer/history">History</Nav.Link>
                            <Nav.Link style={{color:"white"}} href="#Receiver">Receiver List</Nav.Link>
                        </Nav>
                    </Nav>

                    <Nav style={{marginLeft:"50px"}}>
                        <Nav className="justify-content-end" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link style={{color:"white"}} href="/customer/profile"><i style={{marginRight:"5px"}} className="fas fa-user"></i>{localStorage.username}</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link style={{color:"white"}} href="/customer/profile"><i style={{marginRight:"5px"}}  className="fas fa-bell"></i>Notification</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link style={{color:"white"}} href="/" onClick={handleLogout}><i style={{marginRight:"5px"}} className="fas fa-sign-out-alt"></i>Sign out</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
            :null}
        </div>
    );
}

export default Header;