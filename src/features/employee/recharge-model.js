import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {Button,Modal,InputGroup,FormControl,Form} from 'react-bootstrap';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const RechargeModel = props => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [balance, setBalance] = useState("");
    const [money, setMoney] = useState({ money: "" });
    const [showResult, setshowResult] = useState(false);

    const close = () => {
        setShowModal(false);
    }
    const open = () => {
        setShowModal(true);
    }
    const changeMoney = (event) => {
        setMoney(
            {
                ...money,
                [event.target.name]: event.target.value
            });
    }
    const updateBalanceView = async () => {
        //dispatch(updateBalance(props.Id, money.money));

        setTimeout(()=>{
            setshowResult(true);
        },2000)

        var m = money.money
        const response = await axios.post(
            'http://localhost:3001/employee/recharge',
            { ID: props.Id, Money: m }
        );
        if (response.data.success){
            setBalance(response.data.data)
        }
    }
    return (
        <div>
            <Modal show={showModal} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Add money </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <InputGroup>
                    <Form.Control as="select" custom>
                            <option>Checking account</option>
                            <option>Saving account</option>
                        </Form.Control>
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <FormControl type="number" value={money.money} name="money"  onChange={changeMoney} placeholder="Amount" aria-label="Money">
                        </FormControl>
                    </InputGroup>
                    <br/>
                    <div style={{textAlign:'center'}}>
                        {showResult === true
                        ?<h5 style={{color:'green'}}>add money successfully</h5>
                        :null}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button style={{width:'100px'}} onClick={updateBalanceView}>Add</Button>
                    <Button variant="danger" style={{width:'100px'}} onClick={close}>Cancle</Button>
                </Modal.Footer>
            </Modal>
            <Button variant="primary" onClick={open}><MonetizationOnIcon/></Button>

        </div>
    )

}
export default RechargeModel;