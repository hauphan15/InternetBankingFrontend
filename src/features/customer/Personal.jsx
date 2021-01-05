import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {Row, Col, Form, Button} from 'react-bootstrap';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    getProfileAsync,
    sendOTPCodeAsync,
    changePasswordAsync
} from './customerSlice';

function Personal() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.customer.profile);
    const isSuccess = useSelector(state => state.customer.isSuccess);
    const errorMessage = useSelector(state => state.customer.errorMessage);

    const [showProgress, setShowProgress] = useState(false);
    const [step, setStep] = useState(1);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [otpCode, setOtpCode] = useState('');

    const [matched, setMatched] = useState(null);

    useEffect(() => {
        dispatch(getProfileAsync());
    }, [])


    useEffect(() => {
        if(confirmPassword === newPassword && confirmPassword !== '' && newPassword !== ''){
            setMatched(true);
        }
        else if(confirmPassword !== newPassword  && confirmPassword !== '' && newPassword !== ''){
            setMatched(false);
        }
    }, [newPassword, confirmPassword])

    function handleSendOTP(){
        setStep(2);
        dispatch(sendOTPCodeAsync());
    }

    function handleChangePassword(){
        dispatch(changePasswordAsync(oldPassword, newPassword, otpCode));
        setStep(3);
        setShowProgress(true);

        setTimeout(()=>{
            setShowProgress(false);
        }, 3000);
    }

    function handleBack(){
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setOtpCode('');
        setStep(1);
    }

    return (
        <div style={{margin:"20px 100px"}}>
            <Row>
                <Col xs={8}>
                    <div style={{backgroundColor:"white", borderRadius:"10px", padding:'20px'}}>
                        <h4 style={{color:"#24305E", textAlign:'center'}}>Personal profile</h4>
                        <Form style={{padding:"20px"}}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control disabled value={profile.FullName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Date of birth</Form.Label>
                                    <Form.Control disabled value={profile.Birthday} />
                                </Form.Group>
                                <Form.Group as={Col} xs={3}>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control disabled value={profile.Gender} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control disabled value={profile.Phone} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control disabled value={profile.Email} />
                                </Form.Group>
                                <Form.Group as={Col} xs={3}>
                                    <Form.Label>ID Card</Form.Label>
                                    <Form.Control disabled value={profile.IdentificationCardID} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control disabled value={profile.Address} />
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
                <Col>
                    <div style={{backgroundColor:"white", borderRadius:"10px",  padding:'20px'}}>
                        <h4 style={{color:"#24305E", textAlign:'center'}}>Change password</h4>
                        {step === 1
                        ?<Form style={{padding:"20px"}}> 
                            <Form.Group>
                                <Form.Label>Old password</Form.Label>
                                <Form.Control type="password" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} placeholder="Old password" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>New password</Form.Label>
                                <Form.Control style={matched === false ? {borderColor:"red"} : {borderColor:"green"}} type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="New password"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm new password</Form.Label>
                                {matched === false
                                ?<Form.Text style={{color:'red'}} className="text-muted">not match</Form.Text>:null}
                                <Form.Control style={matched === false ? {borderColor:"red"} : {borderColor:"green"}} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm new password"/>
                            </Form.Group>
                            <Button disabled={!matched} onClick={handleSendOTP} style={{width:'-webkit-fill-available', backgroundColor:'#24305E'}}>Continue</Button>
                        </Form>
                        :null}

                        {step === 2
                        ?<Form>
                            <Form.Group>
                                <Form.Label>We have send you OTP Code, please check your email and verify it here</Form.Label>
                                <Form.Control value={otpCode} onChange={(event) => setOtpCode(event.target.value)} type="number" style={{marginTop:'15px'}} placeholder="OTP Code"/>
                            </Form.Group>

                            <Button onClick={handleChangePassword} style={{width:'-webkit-fill-available', backgroundColor:'#24305E'}}>Verify</Button>
                        </Form>
                        :null}

                        {step === 3 && showProgress === true
                        ?<div style={{marginTop:"40px", textAlign:'center'}}>
                            <CircularProgress/>
                        </div>
                        :<div style={{marginTop:"30px"}}>
                            {isSuccess === true && step === 3
                            ?<div style={{color:"green", textAlign:'center'}}>
                                <div><CheckBoxIcon style={{fontSize:"50px"}} /></div>
                                <div style={{fontSize:"25px", fontWeight:"600"}}>Successful</div>
                                <br/>
                                <Button onClick={handleBack} style={{width:'250px', backgroundColor:'#24305E'}}>Back</Button>
                            </div>
                            :null}

                            {isSuccess === false && step === 3
                            ?<div style={{color:"red", textAlign:'center'}}>
                                <div><ReportProblemIcon style={{fontSize:"50px"}} /></div>
                                <div style={{fontSize:"25px", fontWeight:"600"}}>Failed</div>
                                <div style={{fontSize:"20px", fontWeight:"500"}}>{errorMessage}</div>
                                <br/>
                                <Button onClick={handleBack} style={{width:'250px', backgroundColor:'#24305E'}}>Back</Button>
                            </div>
                            :null}
                        </div>}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Personal;