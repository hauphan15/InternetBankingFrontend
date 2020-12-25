import React,{useEffect} from 'react';
import {Navbar,Nav, Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import {logout} from '../auth/authSlice';
import {getAllNotificationAsync, seenAllNotificationAsync} from './headerSlice';

function Header() {
    const dispatch = useDispatch();
    const dispatch1 = useDispatch();
    const dispatch2 = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);

    const notifications = useSelector(state => state.header.notification);  

    useEffect(() => {
        dispatch1(getAllNotificationAsync());
    }, []);

    function handleLogout(){
        dispatch(logout())
    }

    function handleClickBell(){
        dispatch2(seenAllNotificationAsync());
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
                                <Nav.Link style={{color:"#24305E"}} 
                                    onClick={handleClickBell} 
                                    href="/customer/homepage" >
                                        <Badge badgeContent={notifications.length} color="secondary"><NotificationsIcon/></Badge> Notification
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