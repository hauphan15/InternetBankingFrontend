import React,{useEffect} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import {logout} from '../auth/authSlice';
import {getAllNotificationAsync, seenAllNotificationAsync} from './headerSlice';
import HistoryIcon from '@material-ui/icons/History';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

function Header() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);

    const notifications = useSelector(state => state.header.notification);  

    useEffect(() => {
        if(localStorage.access_token !=='' || loggedIn===true){
            dispatch(getAllNotificationAsync());
        }
    }, [loggedIn]);

    function handleLogout(){
        dispatch(logout())
    }

    function handleClickBell(){
        dispatch(seenAllNotificationAsync());
    }

    return (
        <div style={{backgroundColor:"white"}}>
            <div style={{marginLeft:"100px", marginRight:"100px"}}>
                {localStorage.access_token !=='' && localStorage.permission === 'customer'
                ?<Navbar style={{paddingRight:"0px", paddingLeft:"0px"}} expand="lg">
                    <Navbar.Brand style={{color:"#24305E", fontSize:"100", fontWeight:"700"}} href="/customer/homepage">
                        Internet Banking
                    </Navbar.Brand>
                    <Nav className="mr-auto" style={{fontWeight:"500"}}>
                        <Nav.Link style={{color:"#24305E"}} href="/customer/transaction">
                            <SwapHorizIcon/>Transaction
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
                        <Nav.Link style={{color:"#24305E"}} href="/customer/notification" onClick={handleClickBell}>
                                <Badge badgeContent={notifications.length} color="secondary"><NotificationsIcon/></Badge> Notification
                        </Nav.Link>
                        <Nav.Link style={{color:"#24305E"}} href="/" onClick={handleLogout}>
                            <i style={{marginRight:"5px"}} className="fas fa-sign-out-alt"></i>Sign out
                        </Nav.Link>
                    </Nav>
                </Navbar>
                :null}

                {localStorage.access_token !=='' && localStorage.permission === 'admin'
                ?<Navbar style={{paddingRight:"0px", paddingLeft:"0px"}} expand="lg">
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
                ?<Navbar style={{paddingRight:"0px", paddingLeft:"0px"}} expand="lg">
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
            </div>
        </div>
    );
}

export default Header;