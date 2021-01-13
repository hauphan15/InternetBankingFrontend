import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Button, Table, Modal, Form} from 'react-bootstrap';
import { 
    resetResponseResult,
    getEmployeeListAsync,
    addEmployeeAsync,
    removeEmployeeAsync,
} from './adminSlice';

function HomePage() {

    const dispatch = useDispatch();
    const employeeList = useSelector(state => state.admin.employeeList);
    const errorMessage = useSelector(state => state.admin.errorMessage);
    const isSuccess =  useSelector(state => state.admin.isSuccess);

    useEffect(() => {
        dispatch(getEmployeeListAsync());
    },[])

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [idCard, setIdCard] = useState('');

    const [selectedId, setSelectedId] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const [showResult, setShowResult] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    function handleShowRemoveModal(employee){
        setShowRemoveModal(true);
        setSelectedEmployee(employee.FullName);
        setSelectedId(employee.ID);
        
    }

    function handleCloseAddModal(){
        setShowAddModal(false);
        setFullName('');
        setBirthday('');
        setGender('');
        setAddress('');
        setPhone('');
        setEmail('');
        setIdCard('');
    }

    function handleAddEmployee(){
        dispatch(resetResponseResult());

        const registerInfo={
            username: username,
            password: password,
            fullName: fullName,
            birthday: birthday,
            gender: gender,
            address: address,
            phone: phone,
            email: email,
            idCard: idCard
        }

        dispatch(addEmployeeAsync(registerInfo));

        setTimeout(()=>{
            setShowResult(true);
        },2000);

        setTimeout(()=>{
            setShowResult(false);
        }, 4000);
    }

    function handleRemoveEmployee(){
        dispatch(resetResponseResult());
        dispatch(removeEmployeeAsync(selectedId));

        setTimeout(()=>{
            setShowResult(true);
        },2000);

        setTimeout(()=>{
            setShowResult(false);
        }, 4000);
    }

    function handleViewDetail(employee){
        setShowDetailModal(true);
        setId(employee.ID);
        setFullName(employee.FullName);
        setBirthday(employee.Birthday);
        setGender(employee.Gender);
        setAddress(employee.Address);
        setPhone(employee.Phone);
        setEmail(employee.Email);
        setIdCard(employee.IdentificationCardID);
    }

    return (
        <div>
            <div style={{marginTop:"50px", marginLeft:"100px", marginRight:"100px"}}>
                <Row style={{margin:"0px"}}>
                    <ul style={{display:"flex", paddingLeft:"0"}}>
                        <li style={{display:"inline-block"}}>
                            <h4>Employee List</h4>
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
                                <th style={{ fontWeight:"400"}}>Full Name</th>
                                <th style={{ fontWeight:"400"}}>Gender</th>
                                <th style={{ fontWeight:"400"}}>Phone</th>
                                <th style={{ fontWeight:"400"}}>Email</th>
                                <th style={{ fontWeight:"400", width:"250px"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody align="center"  style={{color:"gray", fontWeight:"600"}}>
                            {employeeList.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.FullName}</td>
                                    <td>{item.Gender}</td>
                                    <td>{item.Phone}</td>
                                    <td>{item.Email}</td>
                                    <td>
                                        <ul style={{display:"flex",justifyContent:"space-around",listStyleType:'none' ,paddingLeft:"0px", marginBottom:"0px"}}>
                                            <li>
                                                <Button onClick={()=>handleViewDetail(item)} 
                                                style={{backgroundColor:"#24305E", borderRadius:"20px", fontSize:"12px", width:"90px"}}>
                                                    <i style={{marginRight:"5px"}} className="fas fa-info-circle"></i>
                                                    Detail
                                                </Button>
                                            </li>
                                            <li>
                                                <Button onClick={()=>handleShowRemoveModal(item)} 
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
            </div>
            {/* Add employee modal */}
            <Modal show={showAddModal} onHide={()=>setShowAddModal(false)} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#24305E"}}>Add employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control onChange={(event)=>setUsername(event.target.value)} value={username} type="text" placeholder="username" />
                            <br/>
                            <Form.Control onChange={(event)=>setPassword(event.target.value)} value={password} type="password" placeholder="password" />
                            <br/>
                            <Form.Control onChange={(event)=>setFullName(event.target.value)} value={fullName} type="text" placeholder="full name" />
                            <br/>
                            <Form.Control onChange={(event)=>setBirthday(event.target.value)} value={birthday} type="text" placeholder="date of birth" />
                            <br/>
                            <Form.Control onChange={(event)=>setGender(event.target.value)} value={gender} type="text" placeholder="gender" />
                            <br/>
                            <Form.Control onChange={(event)=>setAddress(event.target.value)} value={address} type="text" placeholder="address" />
                            <br/>
                            <Form.Control onChange={(event)=>setPhone(event.target.value)} value={phone} type="number" placeholder="phone number" />
                            <br/>
                            <Form.Control onChange={(event)=>setEmail(event.target.value)} value={email} type="text" placeholder="email" />
                            <br/>
                            <Form.Control onChange={(event)=>setIdCard(event.target.value)} value={idCard} type="number" placeholder="id card" />
                            <br/>
                        </Form.Group>
                        
                        <Form.Group>
                            {isSuccess === true && showResult === true
                            ?<h6 style={{color: "green", textAlign:"center"}}>Success</h6>
                            :null}

                            {isSuccess === false && showResult === true
                            ?<h6 style={{color: "red", textAlign:"center"}}>{errorMessage}</h6>
                            :null}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleCloseAddModal}>
                        <i style={{marginRight:"5px"}} className="fas fa-window-close"></i>Close
                    </Button>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleAddEmployee}>
                        <i style={{marginRight:"5px"}} className="fas fa-save"></i>Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Show detail information modal */}
            <Modal show={showDetailModal} onHide={()=>setShowDetailModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#24305E"}}>Add employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID:</Form.Label>
                            <Form.Control value={id} type="number" readOnly/>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Full Name:</Form.Label>
                            <Form.Control value={fullName} type="text" readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date of Birth:</Form.Label>
                            <Form.Control value={birthday} type="text" readOnly/> 
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender:</Form.Label>
                            <Form.Control value={gender} type="text" readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Address:</Form.Label>
                            <Form.Control value={address} type="text" readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone Number:</Form.Label>
                            <Form.Control value={phone} type="number" readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control value={email} type="text" readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ID Card:</Form.Label>
                            <Form.Control value={idCard} type="number" readOnly/>
                        </Form.Group>

                        <Form.Group>
                            {isSuccess === true && showResult === true
                            ?<h6 style={{color: "green", textAlign:"center"}}>Success</h6>
                            :null}

                            {isSuccess === false && showResult === true
                            ?<h6 style={{color: "red", textAlign:"center"}}>{errorMessage}</h6>
                            :null}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={() => setShowDetailModal(false)}>
                        <i style={{marginRight:"5px"}} className="fas fa-window-close"></i>Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Remove employee  modal */}
            <Modal show={showRemoveModal} onHide={()=>setShowRemoveModal(false)} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#24305E"}}>Are you sure to remove this employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" value={selectedEmployee} readOnly/>
                    </Form.Group>
                    <Form.Group>
                            {isSuccess === true && showResult === true
                            ?<h6 style={{color: "green", textAlign:"center"}}>Success</h6>
                            :null}

                            {isSuccess === false && showResult === true
                            ?<h6 style={{color: "red", textAlign:"center"}}>{errorMessage}</h6>
                            :null}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={()=>setShowRemoveModal(false)}>
                        <i style={{marginRight:"5px"}} className="fas fa-window-close"></i>
                        Cancle
                    </Button>
                    <Button style={{backgroundColor:"#24305E", width:"90px", borderRadius:"20px",fontSize:"12px"}} onClick={handleRemoveEmployee}>
                        <i style={{marginRight:"5px"}} className="fas fa-save"></i>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default HomePage;