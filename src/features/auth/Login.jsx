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
            history.push('/customer/homepage');
        }

        return function cleanup(){
            isSubscribed = false;
            console.log('unmounted');
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
            <Container style={{borderRadius:"30px",marginTop:"150px", backgroundColor:"#f8f9fa", width:"800px"}}>
                <Row>
                    <Col style={{backgroundColor:"#007bff", borderRadius:"30px 0px 0px 30px"}}>
                    <Jumbotron style={{backgroundColor:"#007bff", borderRadius:"30px 0px 0px 30px", color:"white"}}>
                        <h1>Welcome to Internet Banking Application</h1>
                    </Jumbotron>
                    </Col>
                    <Col>
                        <Form onSubmit={handleLogin} style={{height:"100px", width:"250px",display:"inline-block" ,textAlign:"left", marginTop:"50px"}}>
                            
                            <Form.Group style={{textAlign:"center"}}>
                                <h3>Sign in</h3>
                            </Form.Group>
                            {loggedIn === false && alert === true ? <h6 style={{ color: "red" }}>Incorrect username or password</h6> : null}
                            <Form.Group>
                                <Form.Control  onChange={event => setUsername(event.target.value)} placeholder="Username;" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control  onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit" style={{width:"inherit", marginTop:"10px"}}> Sign in </Button>
                        </Form>
                        
                    </Col>
                </Row>
            </Container>

        </div>
    );
}