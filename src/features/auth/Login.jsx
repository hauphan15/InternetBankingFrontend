import { React, useState, useEffect } from 'react';
import { login } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button,Container,Row, Col,Jumbotron } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const history = useHistory();

    const dispath = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);

    useEffect(() => {
        let isSubscribed = true;
        if(loggedIn && isSubscribed)
        {
            if(localStorage.permission === 'customer'){
                history.push('/customer/homepage');
            }
            else if(localStorage.permission === 'admin'){
                history.push('/admin/homepage');
            }
            else if(localStorage.permission === 'employee'){
                history.push('/employee/homepage');
            }
        }

        return function cleanup(){
            isSubscribed = false;
        }
    },[loggedIn]);

    function handleLogin(event) {
        event.preventDefault();

        dispath(login(username, password));

        //show alert
        setTimeout(() => {
            setAlert(true);
        }, 2000);

        //hide alert
        setTimeout(() => {
            setAlert(false);
        }, 5000);
    }


    return (
        <div style={{textAlign:"center"}}>
            <Container style={{borderRadius:"30px",marginTop:"150px", 
            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            backgroundColor:"white", width:"800px"}}>
                <Row>
                    <Col style={{backgroundColor:"#374785", borderRadius:"30px 0px 0px 30px"}}>
                        <Jumbotron style={{backgroundColor:"#374785", borderRadius:"30px 0px 0px 30px", color:"white"}}>
                            <h1 style={{fontSize:"40px"}}>Welcome to Internet Banking</h1>
                            <p style={{marginTop:"25px", fontSize:"20px"}}>
                                We provide you the easiest way to transfer your money to everyone
                            </p>
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Form onSubmit={handleLogin} style={{height:"100px", width:"250px",display:"inline-block" ,textAlign:"left", marginTop:"50px"}}>
                            
                            <Form.Group style={{textAlign:"center"}}>
                                <h3 style={{ color:"#24305E"}}>Sign in</h3>
                            </Form.Group>
                            {loggedIn === false && alert === true ? <h6 style={{ color: "red" }}>Incorrect username or password</h6> : null}
                            <Form.Group>
                                <Form.Control value={username} onChange={event => setUsername(event.target.value)} placeholder="Username" />
                            </Form.Group>

                            <Form.Group style={{marginBottom:"0"}}>
                                <Form.Control value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" />
                            </Form.Group>

                            <div align="end">
                                <a style={{fontSize:"13px", textDecoration:"none", color:"#374785"}} href="">Forget your password</a>
                            </div>

                            <Button type="submit" style={{width:"inherit", marginTop:"20px", backgroundColor:"#374785"}}> Sign in </Button>
                        </Form>
                        
                    </Col>
                </Row>
            </Container>

        </div>
    );
}