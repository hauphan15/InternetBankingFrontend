import React,{useEffect, useState} from 'react';
import {Table, Row, Button, Modal,ListGroup, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    getAllHistoryAsync,
    getCurrentMonthHistoryAsync,
} from './adminSlice';
import {
    getUserProfileAsync,
} from '../customer/customerSlice';

function History() {
    const allHistory = useSelector(state => state.admin.allHistory);
    const currentMonthHistory = useSelector(state => state.admin.currentMonthHistory);
    const userProfile = useSelector(state => state.customer.userProfile);

    const dispatch = useDispatch();

    const [showDetail, setShowDetail] = useState(false);

    const [showProgress, setShowProgress] = useState(true);

    const [transactionId, setTransactionId] = useState('');

    const [senderName, setSenderName] = useState('');
    const [senderNumber, setSenderNumber] = useState('');

    const [receiverName, setReceiverName] = useState('');
    const [receiverNumber, setReceiverNumber] = useState('');

    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        dispatch(getAllHistoryAsync());
        dispatch(getCurrentMonthHistoryAsync());
    },[])

    //khi api trả về kết quả cho userProfile (userProfile changes it's value) rồi mới setState
    useEffect(() => {
        setSenderName(userProfile.senderProfile.fullName);
        setReceiverName(userProfile.receiverProfile.fullName);
    }, [userProfile]);
    
    function handleViewDetail(object){
        setShowDetail(true);

        setTransactionId(object.ID);

        setSenderNumber(object.SenderNumber);
        setReceiverNumber(object.ReceiverNumber);

        setAmount(object.Money);
        setMessage(object.Content);
        setTime(object.DateSend);
        
        dispatch(getUserProfileAsync(object.SenderID, object.ReceiverID));

        setTimeout(()=>{
            setShowProgress(false);
         }, 2000);
    }

    function handleCloseDetail(){
        setShowDetail(false);
        setShowProgress(true);
    }

    return (
        <div>
            <div style={{marginTop:"50px",marginLeft:"100px", marginRight:"100px"}}>
                <Row style={{margin:"0px"}}>
                    <h4 style={{color:"#24305E"}}>Current Month Transaction History</h4>
                    <br/>
                    <br/>
                    <Table style={{ backgroundColor:"white"}}>
                        <thead align="center" style={{color:"white", backgroundColor:"#24305E"}}>
                            <tr>
                                <th style={{width:"220px", fontWeight:"400"}}>Date</th>
                                <th style={{fontWeight:"400"}}>Description</th>
                                <th style={{width:"180px", fontWeight:"400"}}>Amount</th>
                                <th style={{width:"100px", fontWeight:"400"}}>Status</th>
                                <th style={{width:"100px", fontWeight:"450"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody align="center"  style={{color:"gray", fontWeight:"600"}}>
                            {currentMonthHistory.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.DateSend}</td>
                                    <td>{item.Content}</td>
                                    <td>{item.Money}</td>
                                    <td style={{color:"green", fontWeight:"600"}}>Success</td>
                                    <td>
                                        <Button onClick={()=>handleViewDetail(item)} style={{borderRadius:"20px",backgroundColor:"#24305E", width:"110px", fontSize:"12px"}}>
                                            <i style={{marginRight:"5px"}} className="fas fa-info-circle"></i>View detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <br/>
                <Row style={{margin:"0px"}}>
                    <h4 style={{color:"#24305E"}}>All Transaction History</h4>
                    <br/>
                    <br/>
                    <Table style={{ backgroundColor:"white"}}>
                        <thead align="center" style={{color:"white", backgroundColor:"#24305E"}}>
                            <tr>
                                <th style={{width:"220px", fontWeight:"400"}}>Date</th>
                                <th style={{fontWeight:"400"}}>Description</th>
                                <th style={{width:"180px", fontWeight:"400"}}>Amount</th>
                                <th style={{width:"100px", fontWeight:"400"}}>Status</th>
                                <th style={{width:"100px", fontWeight:"400"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody align="center" style={{color:"gray", fontWeight:"600"}}>
                            {allHistory.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.DateSend}</td>
                                    <td>{item.Content}</td>
                                    <td>{item.Money}</td>
                                    <td style={{color:"green", fontWeight:"600"}}>Success</td>
                                    <td>
                                        <Button onClick={()=>handleViewDetail(item)} style={{borderRadius:"20px",backgroundColor:"#24305E" ,width:"110px", fontSize:"12px"}}>
                                            <i style={{marginRight:"5px"}} className="fas fa-info-circle"></i>View detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </div>
                                
            {/* view send transaction detail modal */}
            <Modal show={showDetail} onHide={handleCloseDetail}   size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#24305E"}}>Transaction Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {showProgress === true
                   ?<div style={{textAlign:"center"}}>
                        <CircularProgress/>
                   </div>
                   :<div>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col style={{fontWeight:"600"}}>Trasaction ID</Col>
                                    <Col>{transactionId}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col style={{fontWeight:"600"}}>Sender Number</Col>
                                    <Col>{senderNumber}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col style={{fontWeight:"600"}}>Sender Name</Col>
                                    <Col>{senderName}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col style={{fontWeight:"600"}}>Receiver Number</Col>
                                    <Col>{receiverNumber}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col style={{fontWeight:"600"}}>Receiver Name</Col>
                                    <Col>{receiverName}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col style={{fontWeight:"600"}}>Amount</Col>
                                    <Col>{amount}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col style={{fontWeight:"600"}}>Message</Col>
                                    <Col>{message}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col style={{fontWeight:"600"}}>Time</Col>
                                    <Col>{time}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleCloseDetail}>
                        <i style={{marginRight:"5px"}} className="fas fa-window-close"></i>Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default History;