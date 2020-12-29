import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row,Col,Card,Jumbotron,Button, ListGroup, Table} from 'react-bootstrap';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import {lastFiveHistoryAsync} from './customerSlice';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {useHistory} from 'react-router-dom';

 function HomePage() {
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const recentTransaction = useSelector(state => state.customer.lastFiveHistory);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(lastFiveHistoryAsync());
    }, [loggedIn])

    function handleClickTalbe(){
        history.push('/customer/history');
    }

    return (
        <div >
            <div style={{backgroundColor:"#24305E"}}>
                <div style={{marginRight:"100px", marginLeft:"100px"}}>
                    <Row style={{margin:"0"}}>
                        <Col style={{padding:"0"}}>
                            <Jumbotron style={{backgroundColor:"#24305E",paddingLeft:"0",paddingRight:"0", borderRadius:"0"}}>
                                <h1 style={{color:"white", fontSize:"50px"}}>Internet Banking</h1>
                                <p  style={{color:"white", width:"500px", fontSize:"30px"}} >
                                    Working for customer satisfaction
                                </p>
                                <p>
                                    <Button style={{backgroundColor:"white", color:"#24305E",borderRadius:"20px", fontWeight:"700" , marginTop:"50px"}}>
                                            Learn more
                                    </Button>
                                </p>
                            </Jumbotron>
                        </Col>
                        <Col style={{padding:"0"}} align="end">
                            <img src="/logo.png" style={{width:"300px"}} alt=""/>
                        </Col>
                    </Row>

                </div>
            </div>

            <div style={{marginTop:"40px", marginLeft:"100px", marginRight:"100px"}}>
                <Card style={{borderRadius:"10px", height:"175px",
                boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",}}>
                    <Row style={{margin:"0"}}>
                        <Col>
                            <ul style={{listStyleType:"none", color:"#24305E"}}>
                                <li style={{fontWeight:"600", fontSize:"30px"}}>Checking Account Balance</li>
                                <li>
                                    <ul style={{display:"flex",fontFamily:"fantasy",listStyleType:"none", padding:"0", marginTop:"55px"}}>
                                        <li style={{fontSize:"40px", marginRight:"10px"}}>$</li>
                                        <li style={{fontSize:"40px"}}>10000</li>
                                    </ul>
                                </li>
                            </ul>
                        </Col>
                        <Col>
                            <ul style={{display:"flex",color:"gray",
                            fontFamily:"monospace",fontSize:"25px",
                            fontWeight:"600",listStyleType:"none", 
                            justifyContent:"space-between", paddingInlineEnd:"40px",
                            paddingInlineStart:"0",marginTop:"130px"}}>
                                <li>{localStorage.username}</li>
                                <li>{localStorage.checkingAccountNumber}</li>
                                <li>12-02-2020</li>
                            </ul>
                        </Col>
                    </Row>
                </Card>
                <Card style={{borderRadius:"10px", height:"175px",marginTop:"20px",
                boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",}}>
                    <Row>
                        <Col>
                            <ul style={{listStyleType:"none", color:"#24305E"}}>
                                <li style={{fontWeight:"600", fontSize:"30px"}}>Saving Account Balance</li>
                                <li>
                                    <ul style={{display:"flex",fontFamily:"fantasy",listStyleType:"none", padding:"0", marginTop:"55px"}}>
                                        <li style={{fontSize:"40px", marginRight:"10px"}}>$</li>
                                        <li style={{fontSize:"40px"}}>99000</li>
                                    </ul>
                                </li>
                            </ul>
                        </Col>
                        <Col>
                            <ul style={{display:"flex",color:"gray",
                            fontFamily:"monospace",fontSize:"25px",
                            fontWeight:"600",listStyleType:"none", 
                            justifyContent:"space-between", paddingInlineEnd:"40px",
                            paddingInlineStart:"0",marginTop:"130px"}}>
                                <li>{localStorage.username}</li>
                                <li>0123456789</li>
                                <li>12-02-2020</li>
                            </ul>
                        </Col>
                    </Row>
                </Card>
                <div style={{marginTop:"40px"}}>
                    <h4>Recent transactions</h4>
                    <Table hover style={{ backgroundColor:"white"}} onClick={handleClickTalbe}>
                        <tbody style={{cursor:"pointer"}}>
                            {recentTransaction.map(item =>(
                                <tr key={item.ID}>
                                    {item.SenderID === +localStorage.userID
                                    ?<td style={{color:"red", width:"120px"}}><CallMadeIcon/>Sent</td>
                                    :<td style={{color:"green", width:"120px"}}><CallReceivedIcon/>Received</td>}

                                    <td style={{width:"150px"}}><AttachMoneyIcon/>{item.Money}</td>

                                    {item.SenderID === +localStorage.userID
                                    ?<td style={{width:"80px"}}>to</td>
                                    :<td style={{width:"80px"}}>from</td>}

                                    {item.SenderID === +localStorage.userID
                                    ?<td>{item.ReceiverNumber}</td>
                                    :<td>{item.SenderNumber}</td>}

                                    <td align="end">{item.DateSend} <AccessTimeIcon/></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
export default HomePage