import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { updateBalance } from './employeeSlice';

const RechargeModel = props => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [balance, setBalance] = useState("");
    const [money, setMoney] = useState({ money: "" });
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
                    <Modal.Title>Recharge money ${balance == "" ? "" : balance} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl
                            value={money.money}
                            name="money"
                            onChange={changeMoney}
                            placeholder="Money"
                            aria-label="Money"></FormControl>
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn-success" onClick={updateBalanceView}>Confirm</Button>
                    <Button style={{ background: 'white', color: "blue" }} onClick={close}>Close</Button>
                </Modal.Footer>
            </Modal>
            <button className="btn-success" onClick={open} style={{ color: "khaki" }}>Recharge $$$</button>

        </div>
    )

}
export default RechargeModel;