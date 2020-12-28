import React,{useEffect} from 'react';
import {Navbar,Nav, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import {logout} from '../auth/authSlice';
import {getAllNotificationAsync, seenAllNotificationAsync} from './headerSlice';
import HistoryIcon from '@material-ui/icons/History';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import CreditCardIcon from '@material-ui/icons/CreditCard';

function Header() {
    const dispatch = useDispatch();
    const dispatch1 = useDispatch();
    const dispatch2 = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);

    const notifications = useSelector(state => state.header.notification);  

    useEffect(() => {
        if(localStorage.access_token !=='' || loggedIn===true){
            dispatch1(getAllNotificationAsync());
        }
    }, [loggedIn, localStorage.access_token]);

    function handleLogout(){
        dispatch(logout())
    }

    function handleClickBell(){
        dispatch2(seenAllNotificationAsync());
    }

    return (
        <div style={{backgroundColor:"white"}}>
            <Container style={{paddingLeft:"0px", paddingRight:"0px"}}>
                {localStorage.access_token !=='' && localStorage.permission === 'customer'
                ?<Navbar expand="lg">
                    <Navbar.Brand style={{color:"#24305E", fontSize:"100", fontWeight:"700"}} href="/customer/homepage">
                        Internet Banking
                    </Navbar.Brand>
                    <Nav className="mr-auto" style={{fontWeight:"500"}}>
                        <Nav.Link style={{color:"#24305E"}} href="#Account">
                            <CreditCardIcon/>Account
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/customer/transaction">
                            <SwapVertIcon/>Transaction
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/customer/history">
                            <HistoryIcon/>History
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/customer/receiver">
                            <ListAltIcon/>Receiver List
                        </Nav.Link>
                    </Nav>
                    <Nav style={{marginLeft:"50px"}} className="justify-content-end">
                        <Nav.Link style={ {color:"#24305E"}} href="/customer/profile">
                            <i style={{marginRight:"5px"}} className="fas fa-user"></i>{localStorage.username}
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/customer/homepage" onClick={handleClickBell}>
                                <Badge badgeContent={notifications.length} color="secondary"><NotificationsIcon/></Badge> Notification
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/" onClick={handleLogout}>
                            <i style={{marginRight:"5px"}} className="fas fa-sign-out-alt"></i>Sign out
                        </Nav.Link>
                    </Nav>
                </Navbar>
                :null}

                {localStorage.access_token !=='' && localStorage.permission === 'admin'
                ?<Navbar expand="lg">
                <Navbar.Brand style={{color:"#24305E", fontSize:"100", fontWeight:"700"}} href="/admin/homepage">Internet Banking</Navbar.Brand>
                    <Nav className="mr-auto" style={{fontWeight:"500"}}>
                        <Nav.Link style={{color:"#24305E"}} href="/admin/history">
                            <HistoryIcon/>Transaction history
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/admin/employee-list">
                            <ListAltIcon/>Employee management
                        </Nav.Link>
                    </Nav>
                    <Nav style={{marginLeft:"50px"}} className="justify-content-end">
                        <Nav.Link style={ {color:"#24305E"}} href="/admin/profile">
                            <i style={{marginRight:"5px"}} className="fas fa-user"></i>{localStorage.username}
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/admin/homepage" onClick={handleClickBell}>
                            <Badge badgeContent={notifications.length} color="secondary"><NotificationsIcon/></Badge> Notification
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/" onClick={handleLogout}>
                            <i style={{marginRight:"5px"}} className="fas fa-sign-out-alt"></i> Sign out
                        </Nav.Link>
                    </Nav>
                </Navbar>
                :null}

                {localStorage.access_token !=='' && localStorage.permission === 'employee'
                ?<Navbar expand="lg">
                <Navbar.Brand style={{color:"#24305E", fontSize:"100", fontWeight:"700"}} href="/employee/homepage">Internet Banking</Navbar.Brand>
                    <Nav className="mr-auto" style={{fontWeight:"500"}}>
                        <Nav.Link style={{color:"#24305E"}} href="/employee/create-account">
                            <HistoryIcon/>Create account
                        </Nav.Link>
                    </Nav>
                    <Nav style={{marginLeft:"50px"}} className="justify-content-end">
                        <Nav.Link style={ {color:"#24305E"}} href="/employee/profile">
                            <i style={{marginRight:"5px"}} className="fas fa-user"></i>{localStorage.username}
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/employee/homepage" onClick={handleClickBell}>
                            <Badge badgeContent={notifications.length} color="secondary"><NotificationsIcon/></Badge> Notification
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/" onClick={handleLogout}>
                            <i style={{marginRight:"5px"}} className="fas fa-sign-out-alt"></i> Sign out
                        </Nav.Link>
                    </Nav>
                </Navbar>
                :null}
            </Container>
        </div>
    );
}

export default Header;