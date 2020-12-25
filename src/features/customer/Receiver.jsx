import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table,Container, Row, Button, Modal, Form} from 'react-bootstrap';
import {
    resetResponseResult,
    receiverListAsync, 
    addReceiverAsync, 
    editReceiverAsync, 
    removeReceiverAsync} from './customerSlice';

function Receiver() {

    const receiverList = useSelector(state => state.customer.receiverList);
    const isActionSuccess =  useSelector(state => state.customer.isSuccess);
    const errorMessage = useSelector(state => state.customer.errorMessage);
    const dispatch0 = useDispatch();
    const dispatch1 = useDispatch();
    const dispatch2 = useDispatch();
    const dispatch3 = useDispatch();
    const dispatch4 = useDispatch();
    const dispatch5 = useDispatch();
    const dispatch6 = useDispatch();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    //number và nickname cho add modal
    const [number, setNumber] = useState('');
    const [nickName, setNickName]  = useState('');

    //number, nickname cho selected row
    const [selectedId, setSelectedId] = useState('');
    const [selectedNumber, setSelectedNumber] = useState('');
    const [selectedNickName, setSelectedNickName]  = useState('');


    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        dispatch1(receiverListAsync());
    },[])

    function handleCloseModal(){
        setNumber('');
        setNickName('');
        setShowAddModal(false);
        setShowEditModal(false);
        setShowRemoveModal(false);
    }

    function handleAddReceiver(){
        dispatch0(resetResponseResult());
        dispatch2(addReceiverAsync(number, nickName));

        setTimeout(()=>{
            setShowResult(true);
        }, 1000);

        setTimeout(()=>{
            setShowResult(false);
        }, 4000);
    }

    function handleShowEditModal(id, accountNumber, nickName){
        setSelectedId(id);
        setSelectedNumber(accountNumber);
        setSelectedNickName(nickName);
        setShowEditModal(true);
    }

    function handleShowRemoveModal(id, accountNumber, nickName){
        setSelectedId(id);
        setSelectedNumber(accountNumber);
        setSelectedNickName(nickName);
        setShowRemoveModal(true);
    }

    function handleEditReceiver(){
        dispatch5(resetResponseResult());
        dispatch3(editReceiverAsync(selectedId, selectedNickName));

        setTimeout(()=>{
            setShowResult(true);
        }, 1000);

        setTimeout(()=>{
            setShowResult(false);
        }, 4000);
        setShowEditModal(true);
    }

    function handleRemoveReceiver(){
        dispatch6(resetResponseResult());
        dispatch4(removeReceiverAsync(selectedId));

        setTimeout(()=>{
            setShowResult(true);
        }, 1000);

        setTimeout(()=>{
            setShowResult(false);
        }, 4000);
    }
    
    return (
        <div>
            <Container style={{marginTop:"50px"}}>
                <Row>
                    <ul style={{display:"flex", paddingLeft:"0"}}>
                        <li style={{display:"inline-block"}}>
                            <h4>Receive history</h4>
                        </li>
                        <li style={{display:"inline-block", marginLeft:"20px"}}>
                            <Button onClick={()=>setShowAddModal(true)} style={{backgroundColor:"#24305E",fontSize:"12px", borderRadius:"20px", width:"90px", height:"32px"}}>
                                <i style={{marginRight:"10px"}} className="fas fa-user-plus"></i>
                                Add 
                            </Button>
                        </li>
                    </ul>
                    <br/>
                    <br/>
                    <Table style={{ backgroundColor:"white"}}>
                        <thead align="center" style={{color:"white", backgroundColor:"#24305E"}}>
                            <tr>
                                <th style={{ fontWeight:"400"}}>Nick Name</th>
                                <th style={{ fontWeight:"400"}}>Account Number</th>
                                <th style={{ fontWeight:"400", width:"250px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody align="center"  style={{color:"gray", fontWeight:"600"}}>
                            {receiverList.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.NickName}</td>
                                    <td>{item.AccountNumber}</td>
                                    <td>
                                        <ul style={{display:"flex",justifyContent:"space-around", paddingLeft:"0px", marginBottom:"0px"}}>
                                            <li style={{display:"inline-block"}}>
                                                <Button onClick={()=>handleShowEditModal(item.ID, item.AccountNumber, item.NickName)} 
                                                style={{backgroundColor:"#24305E", borderRadius:"20px",fontSize:"12px", width:"90px"}}>
                                                    <i style={{marginRight:"5px"}} className="fas fa-edit"></i>
                                                    Edit
                                                </Button>
                                            </li>
                                            <li style={{display:"inline-block"}}>
                                                <Button onClick={()=>handleShowRemoveModal(item.ID, item.AccountNumber, item.NickName)} 
                                                style={{backgroundColor:"#24305E", borderRadius:"20px", fontSize:"12px", width:"90px"}}>
                                                    <i style={{marginRight:"5px"}} className="fas fa-trash-alt"></i>
                                                    Remove
                                                </Button>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            {/* Add receiver modal */}
            <Modal show={showAddModal} onHide={()=>setShowAddModal(false)} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#24305E"}}>Add receiver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control onChange={(event)=>setNumber(event.target.value)} value={number} type="number" placeholder="Receiver's checking account number" />
                            <br/>
                            <Form.Control onChange={(event)=>setNickName(event.target.value)} value={nickName} type="text" placeholder="Receiver's nick name" />
                        </Form.Group>
                        
                        <Form.Group>
                            {isActionSuccess === true && showResult === true
                            ?<h6 style={{color: "green", textAlign:"center"}}>Success</h6>
                            :null}

                            {isActionSuccess === false && showResult === true
                            ?<h6 style={{color: "red", textAlign:"center"}}>{errorMessage}</h6>
                            :null}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleCloseModal}>
                        <i style={{marginRight:"5px"}} className="fas fa-window-close"></i>Close
                    </Button>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleAddReceiver}>
                        <i style={{marginRight:"5px"}} className="fas fa-save"></i>Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Edit receiver modal */}
            <Modal show={showEditModal} onHide={()=>setShowEditModal(false)} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#24305E"}}>Edit receiver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="number" value={selectedNumber} readOnly/>
                        <br/>
                        <Form.Control type="text" value={selectedNickName} onChange={(event) => setSelectedNickName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                            {isActionSuccess === true && showResult === true
                            ?<h6 style={{color: "green", textAlign:"center"}}>Success</h6>
                            :null}

                            {isActionSuccess === false && showResult === true
                            ?<h6 style={{color: "red", textAlign:"center"}}>{errorMessage}</h6>
                            :null}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleCloseModal}>
                        <i style={{marginRight:"5px"}} className="fas fa-window-close"></i>Close
                    </Button>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleEditReceiver}>
                        <i style={{marginRight:"5px"}} className="fas fa-save"></i>Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Remove modal */}
            <Modal show={showRemoveModal} onHide={()=>setShowRemoveModal(false)} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#24305E"}}>Are you sure to remove this receiver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="number" value={selectedNumber} readOnly/>
                        <br/>
                        <Form.Control type="text" value={selectedNickName} readOnly/>
                    </Form.Group>
                    <Form.Group>
                            {isActionSuccess === true && showResult === true
                            ?<h6 style={{color: "green", textAlign:"center"}}>Success</h6>
                            :null}

                            {isActionSuccess === false && showResult === true
                            ?<h6 style={{color: "red", textAlign:"center"}}>{errorMessage}</h6>
                            :null}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleCloseModal}>
                        <i style={{marginRight:"5px"}} className="fas fa-window-close"></i>
                        Cancle
                    </Button>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleRemoveReceiver}>
                        <i style={{marginRight:"5px"}} className="fas fa-save"></i>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Receiver;