import React,{useEffect} from 'react';
import {Table, Container, Row, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {transactionHistoryAsync} from '../customer/customerSlice';

function History() {

    const sendHistoryList = useSelector(state => state.customer.sendTransactionHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(transactionHistoryAsync());
    },[])


    return (
        <div>
            <Container style={{marginTop:"50px"}}>
                <Row>
                    <h3>Send History</h3>
                    <br/>
                    <br/>
                    <Table style={{ backgroundColor:"white"}}>
                        <thead align="center" style={{color:"white", backgroundColor:"#343a40"}}>
                            <tr>
                                <th style={{width:"220px"}}>Date</th>
                                <th>Description</th>
                                <th style={{width:"300px"}}>Amount</th>
                                <th style={{width:"100px"}}>Status</th>
                                <th style={{width:"100px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody align="center"  style={{color:"gray", fontWeight:"600"}}>
                            {sendHistoryList.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.DateSend}</td>
                                    <td>{item.Content}</td>
                                    <td>{item.Money}</td>
                                    <td style={{color:"green"}}><b>Success</b></td>
                                    <td><Button style={{borderRadius:"20px", width:"100px", fontSize:"14px"}}>View detail</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                <h3>Receive History</h3>
                <br/>
                <br/>
                <Table style={{ backgroundColor:"white"}}>
                    <thead align="center" style={{color:"white", backgroundColor:"#343a40"}}>
                        <tr>
                            <th style={{width:"220px"}}>Date</th>
                            <th>Description</th>
                            <th style={{width:"300px"}}>Amount</th>
                            <th style={{width:"100px"}}>Status</th>
                            <th style={{width:"100px"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody align="center" style={{color:"gray", fontWeight:"600"}}>
                        {sendHistoryList.map(item => (
                            <tr key={item.ID}>
                                <td>{item.DateSend}</td>
                                <td>{item.Content}</td>
                                <td>{item.Money}</td>
                                <td style={{color:"green"}}><b>Success</b></td>
                                <td><Button style={{borderRadius:"20px", width:"100px", fontSize:"14px"}}>Detail</Button></td>
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