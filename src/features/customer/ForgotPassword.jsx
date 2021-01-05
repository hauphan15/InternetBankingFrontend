import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {InputGroup, Form, Button, Row, Col} from 'react-bootstrap';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    sendOTPCodeForgotPasswordAsync,
    verifyOTPCodeAsync,
    resetPasswordAsync,
} from './customerSlice';

function ForgotPassword() {
    const dispatch = useDispatch();
    const history = useHistory();

    let isSuccess = useSelector(state => state.customer.isSuccess);
    let errorMessage = useSelector(state => state.customer.errorMessage);

    const [showAlert, setShowAlert] = useState(false);
    const [step, setStep] = useState(1);
    const [otpCode, setOtpCode] = useState('');
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [matched, setMatched] = useState(null);
    const [showProgress, setShowProgress] = useState(false);


    useEffect(() => {
        if(confirmPassword === newPassword && confirmPassword !== '' && newPassword !== ''){
            setMatched(true);
        }
        else if(confirmPassword !== newPassword  && confirmPassword !== '' && newPassword !== ''){
            setMatched(false);
        }
    }, [confirmPassword, newPassword])

    function handleSubmit1(event){
        event.preventDefault();
        dispatch(sendOTPCodeForgotPasswordAsync(username));

        setTimeout(()=>{
            setShowAlert(true);
            setStep(2);
        }, 3000);

        setTimeout(()=>{
            setShowAlert(false);
        }, 7000);
    }

    function handleSubmit2(event){
        event.preventDefault();
        dispatch(verifyOTPCodeAsync(username, otpCode));

        setTimeout(()=>{
            setShowAlert(true);
            setStep(3);
        }, 3000);

        setTimeout(()=>{
            setShowAlert(false);
        }, 7000);
    }

    function handleSubmit3(event){
        event.preventDefault();
        isSuccess = null;
        dispatch(resetPasswordAsync(username, newPassword));
        setShowProgress(true);
        setStep(4);

        setTimeout(()=>{
            setShowAlert(true);
            setShowProgress(false);
        }, 4000);

        setTimeout(()=>{
            setShowAlert(false);
        }, 7000);
    }

    function handleBackToLogin(){
        history.push('/');
    }

    return (
        <div style={{display:"flex", justifyContent:"center"}} >
            {step === 1 
            ?<Form onSubmit={handleSubmit1} style={{backgroundColor:"white", width:"320px", padding:"20px", boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",borderRadius:"10px", marginTop:"150px"}} >
                <Form.Group style={{textAlign:"center"}}>
                    <LockIcon style={{fontSize:"100px"}} />
                </Form.Group>
                <Form.Group style={{textAlign:"center"}}>
                    <h4>Forgot your password ?</h4>
                </Form.Group>
                <br/>

                <Form.Group>
                    {showAlert === true && isSuccess === false
                    ?<Form.Text style={{textAlign:"center", color:"red"}}> {errorMessage} </Form.Text>
                    :null}
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                            <InputGroup.Text><AccountCircleIcon/></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" />
                    </InputGroup>
                </Form.Group>
                <br/>
                <Row>
                    <Col>
                        <Button onClick={handleBackToLogin} style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                            Back to login
                        </Button>
                    </Col>

                    <Col>
                        <Button type="submit" style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                            Continue
                        </Button>
                    </Col>
                </Row>
            </Form>
            :null}

            {step === 2 && isSuccess === true
            ?<Form onSubmit={handleSubmit2} style={{backgroundColor:"white", width:"320px", padding:"20px", boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",borderRadius:"10px", marginTop:"150px"}} >
                <Form.Group style={{textAlign:"center"}}>
                    <LockIcon style={{fontSize:"100px"}} />
                </Form.Group>
                <Form.Group style={{textAlign:"center"}}>
                    <h4>Verify OTP Code</h4>
                </Form.Group>
                <br/>
                <Form.Group>
                    {showAlert === true && isSuccess === false
                    ?<Form.Text style={{textAlign:"center", color:"red"}}> {errorMessage} </Form.Text>
                    :null}
                </Form.Group>
                <Form.Group >
                    <Form.Control type="number" value={otpCode} onChange={(event) => setOtpCode(event.target.value)} placeholder="Enter OTP Code" />
                </Form.Group>
                <br/>
                <Row>
                    <Col>
                        <Button onClick={handleBackToLogin} style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                            Back to login
                        </Button>
                    </Col>

                    <Col>
                        <Button type="submit" style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                            Continue
                        </Button>
                    </Col>
                </Row>
            </Form>
            :<div>
                {step === 2 && isSuccess === false
                ?<Form onSubmit={handleSubmit1} style={{backgroundColor:"white", width:"320px", padding:"20px", boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",borderRadius:"10px", marginTop:"150px"}} >
                    <Form.Group style={{textAlign:"center"}}>
                        <LockIcon style={{fontSize:"100px"}} />
                    </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <h4>Forgot your password ?</h4>
                    </Form.Group>
                    <br/>

                    <Form.Group>
                        {showAlert === true
                        ?<Form.Text style={{textAlign:"center", color:"red"}}> {errorMessage} </Form.Text>
                        :null}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><AccountCircleIcon/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" />
                        </InputGroup>
                    </Form.Group>
                    <br/>
                    <Row>
                        <Col>
                            <Button onClick={handleBackToLogin} style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                                Back to login
                            </Button>
                        </Col>

                        <Col>
                            <Button type="submit" style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                                Continue
                            </Button>
                        </Col>
                    </Row>
                </Form>
                :null}
            </div>}

            {step === 3 && isSuccess === true
            ?<Form  onSubmit={handleSubmit3} style={{backgroundColor:"white", width:"320px", padding:"20px", boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",borderRadius:"10px", marginTop:"150px"}} >
                <Form.Group style={{textAlign:"center"}}>
                    <LockIcon style={{fontSize:"100px"}} />
                </Form.Group>
                <Form.Group style={{textAlign:"center"}}>
                    <h4>Reset password</h4>
                </Form.Group>
                <br/>
                <Form.Group>
                    {showAlert === true && isSuccess === false
                    ?<Form.Text style={{textAlign:"center", color:"red"}}> {errorMessage} </Form.Text>
                    :null}
                </Form.Group>
                <Form.Group >
                    <Form.Control style={matched === false ? {borderColor:"red"} : {borderColor:"green"}} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} type="password" placeholder="Enter new password" />
                </Form.Group>
                <Form.Group >
                    {matched === false 
                    ?<Form.Text className="text-muted">
                        password not match
                    </Form.Text>
                    :null}
                    <Form.Control style={matched === false ? {borderColor:"red"} : {borderColor:"green"}} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" placeholder="Verify new password" />
                </Form.Group>
                <br/>
                <Row>
                    <Col>
                        <Button onClick={handleBackToLogin} style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                            Back to login
                        </Button>
                    </Col>

                    <Col>
                        <Button disabled={!matched} type="submit" style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                            Continue
                        </Button>
                    </Col>
                </Row>
            </Form>
            :<div>
                {step === 3 && isSuccess === false
                ?<Form onSubmit={handleSubmit2} style={{backgroundColor:"white", width:"320px", padding:"20px", boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",borderRadius:"10px", marginTop:"150px"}} >
                    <Form.Group style={{textAlign:"center"}}>
                        <LockIcon style={{fontSize:"100px"}} />
                    </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <h4>Verify OTP Code</h4>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        {showAlert === true && isSuccess === false
                        ?<Form.Text style={{textAlign:"center", color:"red"}}> {errorMessage} </Form.Text>
                        :null}
                    </Form.Group>
                    <Form.Group >
                        <Form.Control value={otpCode} onChange={(event) => setOtpCode(event.target.value)} placeholder="Enter OTP Code" />
                    </Form.Group>
                    <br/>
                    <Row>
                        <Col>
                            <Button onClick={handleBackToLogin} style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                                Back to login
                            </Button>
                        </Col>

                        <Col>
                            <Button type="submit" style={{backgroundColor:"#24305E",  width:"-webkit-fill-available"}} >
                                Continue
                            </Button>
                        </Col>
                    </Row>
                </Form>
                :null}
            </div>}

            {step === 4 && showProgress === true
            ?<div style={{marginTop:"60px"}}> <CircularProgress/> </div>
            :<div>
                {isSuccess === true && step === 4
                ?<div style={{backgroundColor:"white",color:"green",textAlign:'center', padding:"20px", boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",borderRadius:"10px", marginTop:"250px"}}>
                    <div><CheckBoxIcon style={{fontSize:"60px"}} /></div>
                    <div style={{fontSize:"30px", fontWeight:"600"}}>Reset password successfully</div>
                    <br/>
                    <br/>
                    <div>
                        <Button style={{backgroundColor:"#24305E"}} onClick={handleBackToLogin} >Back to login page</Button>
                    </div>
                </div>
                :null}
            </div>}

        </div>
    );
}

export default ForgotPassword;