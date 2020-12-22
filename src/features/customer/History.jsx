import React,{useEffect} from 'react';
import {Table, Container, Row, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {sendHistoryAsync, receiveHistoryAsync} from '../customer/customerSlice';

function History() {

    const sendHistoryList = useSelector(state => state.customer.sendHistory);
    const receiveHistoryList = useSelector(state => state.customer.receiveHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sendHistoryAsync());
        dispatch(receiveHistoryAsync());
    },[])


    return (
        <div>
            <Container style={{marginTop:"50px"}}>
                <Row>
                    <h4 style={{color:"#24305E"}}>Send history</h4>
                    <br/>
                    <br/>
                    <Table style={{ backgroundColor:"white"}}>
                        <thead align="center" style={{color:"white", backgroundColor:"#24305E"}}>
                            <tr>
                                <th style={{width:"220px", fontWeight:"400"}}>Date</th>
                                <th style={{fontWeight:"400"}}>Description</th>
                                <th style={{width:"300px", fontWeight:"400"}}>Amount</th>
                                <th style={{width:"100px", fontWeight:"400"}}>Status</th>
                                <th style={{width:"100px", fontWeight:"450"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody align="center"  style={{color:"gray", fontWeight:"600"}}>
                            {sendHistoryList.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.DateSend}</td>
                                    <td>{item.Content}</td>
                                    <td>{item.Money}</td>
                                    <td style={{color:"green", fontWeight:"600"}}>Success</td>
                                    <td>
                                        <Button style={{borderRadius:"20px",backgroundColor:"#24305E", width:"110px", fontSize:"12px"}}>
                                            <i style={{marginRight:"5px"}} className="fas fa-info-circle"></i>View detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <h4 style={{color:"#24305E"}}>Receive history</h4>
                    <br/>
                    <br/>
                    <Table style={{ backgroundColor:"white"}}>
                        <thead align="center" style={{color:"white", backgroundColor:"#24305E"}}>
                            <tr>
                                <th style={{width:"220px", fontWeight:"400"}}>Date</th>
                                <th style={{fontWeight:"400"}}>Description</th>
                                <th style={{width:"300px", fontWeight:"400"}}>Amount</th>
                                <th style={{width:"100px", fontWeight:"400"}}>Status</th>
                                <th style={{width:"100px", fontWeight:"400"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody align="center" style={{color:"gray", fontWeight:"600"}}>
                            {sendHistoryList.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.DateSend}</td>
                                    <td>{item.Content}</td>
                                    <td>{item.Money}</td>
                                    <td style={{color:"green", fontWeight:"600"}}>Success</td>
                                    <td>
                                        <Button style={{borderRadius:"20px",backgroundColor:"#24305E" ,width:"110px", fontSize:"12px"}}>
                                            <i style={{marginRight:"5px"}} className="fas fa-info-circle"></i>View detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
}

export default History;