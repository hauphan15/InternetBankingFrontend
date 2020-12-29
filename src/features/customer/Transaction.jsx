import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Col, Form, Row,Dropdown,Table,Button } from 'react-bootstrap';
import {
    receiverListAsync,
    sendOTPCodeAsync,
    transferMoneyAsync
} from './customerSlice';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import CircularProgress from '@material-ui/core/CircularProgress';

function Transaction() {

    const receiverList = useSelector(state => state.customer.receiverList);
    const transactionResult = useSelector(state => state.customer.isSuccess);//true or false
    const errorMessage = useSelector(state => state.customer.errorMessage);

    const dispatch = useDispatch();


    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);
    const [showProgress, setShowProgress] = useState(false)

    useEffect(() => {
        dispatch(receiverListAsync());
    },[])

    function handleSubmitForm1(event){
        event.preventDefault();
        dispatch(sendOTPCodeAsync());
        setStep(2);
    }

    function handleSubmitForm2(event){
        event.preventDefault();

        const transactionInfo={
            SenderNumber: localStorage.checkingAccountNumber,
            ReceiverNumber:number,
            Money:amount,
            Content:message
        };

        dispatch(transferMoneyAsync(transactionInfo, otpCode));
        setStep(3);
        setShowProgress(true);

        setTimeout(()=>{
            setShowProgress(false);
        },5000);
    }

    function handleSelectRow(accountNumber){
        console.log(accountNumber);
    }

    return (
        <div style={{marginRight:"100px", marginLeft:"100px"}}>
            <Row style={{textAlign:"center",marginTop:"20px", marginRight:"0px",marginLeft:"0px",backgroundColor:"white", borderRadius:"10px"}}>
                <Col>
                    <Button style={ 
                        step===1 
                        ?{backgroundColor:"#24305E", cursor:"default", borderRadius:"50%", width:"38px"} 
                        :{backgroundColor:"#6c757d", cursor:"default", borderRadius:"50%", width:"38px"}}>
                        1
                    </Button>
                </Col>
                <Col>
                    <Button style={ 
                        step===2 
                        ?{backgroundColor:"#24305E", cursor:"default", borderRadius:"50%", width:"38px"} 
                        :{backgroundColor:"#6c757d", cursor:"default", borderRadius:"50%", width:"38px"}}>
                        2
                    </Button>
                </Col>
                <Col>
                    <Button style={ 
                        step===3 
                        ?{backgroundColor:"#24305E", cursor:"default", borderRadius:"50%", width:"38px"} 
                        :{backgroundColor:"#6c757d", cursor:"default", borderRadius:"50%", width:"38px"}}>
                        3
                    </Button>
                </Col>
            </Row>
            <Row style={{marginTop:"20px", marginRight:"0px",marginLeft:"0px", height:"500px", backgroundColor:"white", borderRadius:"10px"}}>
                <Col style={{paddingTop:"30px"}}>
                    <Form onSubmit={handleSubmitForm1} style={{padding:"0px 40px 0px 40px"}}>
                        <Form.Group>
                            <Form.Label style={{color:"#24305E", fontWeight:"600"}}>Receiver's account number:</Form.Label>
                            <Form.Control required disabled = {step === 1 ? false : true} value={number} onChange={(event)=>setNumber(event.target.value)} type="number" placeholder="Receiver's account number"></Form.Control>
                        </Form.Group>
                        
                        <Form.Group>
                            <Dropdown>
                                <Dropdown.Toggle disabled = {step === 1 ? false : true} id="dropdown-basic" style={{backgroundColor:"#24305E", color:"white", width:"100%"}}>
                                    Or chose from receiver list
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Table hover style={{fontSize:"13px", width:"270px"}}>
                                        <thead>
                                            <tr>
                                            <th>Nick Name</th>
                                            <th>Account Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {receiverList.map(item =>(
                                                <tr style={{cursor:"pointer"}}
                                                onClick={()=>setNumber(item.AccountNumber)} key={item.ID}>
                                                    <td>{item.NickName}</td>
                                                    <td>{item.AccountNumber}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{color:"#24305E", fontWeight:"600"}}>Amount:</Form.Label>
                            <Form.Control required disabled = {step === 1 ? false : true} type="number"  placeholder="Amount" 
                            value={amount} onChange={(event) => setAmount(event.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{color:"#24305E", fontWeight:"600"}}>Message:</Form.Label>
                            <Form.Control disabled = {step === 1 ? false : true} as="textarea" rows={4} placeholder="Message"
                            value={message} onChange={(event)=>setMessage(event.target.value)} />
                        </Form.Group>

                        <Button disabled = {step === 1 ? false : true} 
                        type="submit" 
                        style={{backgroundColor:"#24305E", width:"100%"}}>
                            Continue
                        </Button>                       
                    </Form>
                </Col>

                <Col style={{paddingTop:"30px"}}>
                    <Form onSubmit={handleSubmitForm2} style={{padding:"0px 40px 0px 40px"}}>
                        <Form.Group>
                            <Form.Label style={{color:"#24305E", fontWeight:"600"}}>OTP Code:</Form.Label>
                            <Form.Control required disabled = {step === 2 ? false : true} type="number" placeholder="OTP Code"
                            value={otpCode} onChange={(event)=> setOtpCode(event.target.value)} />
                        </Form.Group>
                        <Button disabled = {step === 2 ? false : true} 
                        type="submit" 
                        style={{backgroundColor:"#24305E", width:"100%"}}>
                            Continue
                        </Button>                       
                    </Form>
                </Col>

                <Col style={{textAlign:"center", paddingTop:"30px"}}>
                    {showProgress === true && step === 3
                    ?<div style={{marginTop:"60px"}}>
                        <CircularProgress/>
                    </div>
                    :<div>
                        {transactionResult === true && step === 3
                        ?<ul style={{padding:"0px 40px 0px 40px", listStyleType:"none", color:"green"}}>
                            <li><CheckBoxIcon style={{fontSize:"70px"}} /></li>
                            <li style={{fontSize:"30px", fontWeight:"600"}}>Successful</li>
                        </ul>
                        :null}

                        {transactionResult === false && step === 3
                        ?<ul style={{padding:"0px 40px 0px 40px", listStyleType:"none", color:"red"}}>
                            <li><ReportProblemIcon style={{fontSize:"70px"}} /></li>
                            <li style={{fontSize:"30px", fontWeight:"600"}}>Failed</li>
                            <li style={{fontSize:"20px", fontWeight:"500"}}>{errorMessage}</li>
                        </ul>
                        :null}
                    </div>}
                </Col>
            </Row>
        </div>
    );
}

export default Transaction;