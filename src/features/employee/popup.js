import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {getCustomerProfileAsync} from './employeeSlice';

function PopUp(props) {
    const customerProfile = useSelector(state => state.employee.customerProfile);
    const customerSendTransactionHistory = useSelector(state => state.employee.customerSendTransactionHistory);
    const customerReceiverTransactionHistory = useSelector(state => state.employee.customerReceiverTransactionHistory);
    const [waiting, setWaiting] = useState(1);
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(getCustomerProfileAsync(props.ID));
        setTimeout(() => {
            setWaiting(0);
        }, 7000);
    }, [])
    const load = () => {
        if(waiting === 1) {
            return (
                <div class="spinner-border text-primary "></div> 
            );
        }
    }
  return (
    <div className="popup">
      <div className="popup-inner" style={{overflowY:"scroll"}}>
        <Tab.Container defaultActiveKey="first">
          <div className="d-flex justify-content-between pt-1 pb-1"       style={{ borderBottom: "1px solid black" }}>
              <MyTab />
              <button className="btn btn-outline-danger mr-1" onClick={()=>{props.sendchoose(-1)}}>close</button>
          </div>
        {load()}
        <Tab.Content style={{visibility: waiting === 1 ? 'hidden' : ''}}>
                <SendHistory list={customerSendTransactionHistory} />
                <ReceiverHistory list={customerReceiverTransactionHistory} />
                </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default PopUp;

export const MyTab = (props) => {
  const [active, setActive] = useState(1);
  return (
    <Nav
      variant="pills"
      className="justify-content-begin pl-3"
    >
      <Nav.Item>
        <Nav.Link
          className="my-nav-link"
          eventKey="first"
          onClick={() => {
            setActive(1);
          }}
          style={{
            background: "transparent",
            color: "black",
            borderBottom: active === 1 ? "2px solid blue" : "",
          }}
        >
          Send History
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          className="my-nav-link"
          eventKey="second"
          onClick={() => {
            setActive(2);
          }}
          style={{
            background: "transparent",
            color: "black",
            borderBottom: active === 2 ? "2px solid blue" : "",
          }}
        >
          Receiver History
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export const SendHistory = (props) => {
  return (
    <Tab.Pane className="pt-1" eventKey="first">
      <div className="row m-2">
        <div className="col-sm-2" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>To</h6>
        </div>
        <div className="col-sm-2" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>Full Name</h6>
        </div>
        <div className="col-sm-2" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>Money</h6>
        </div>
        <div className="col-sm-2" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>Date Send</h6>
        </div>
        <div className="col-sm-3" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>Message</h6>
        </div>
      </div>
      <hr style={{margin: 0, padding: 0}} />
      {
          props.list.map((item, index) => {
            return (
                <TransactionItem value={item} key={index} type={1}/>
            )
          })
      }
    </Tab.Pane>
  );
};

export const ReceiverHistory = (props) => {
  return (
    <Tab.Pane eventKey="second">
      <div className="row m-2">
        <div className="col-sm-2" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>From</h6>
        </div>
        <div className="col-sm-2" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>Full Name</h6>
        </div>
        <div className="col-sm-2" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>Money</h6>
        </div>
        <div className="col-sm-2" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>Date Send</h6>
        </div>
        <div className="col-sm-3" style={{ borderLeft: "1px solid #f0f0f0" }}>
          <h6 style={{ marginLeft: 30 }}>Message</h6>
        </div>
      </div>
      <hr style={{margin: 0, padding: 0}} />
      {
          props.list.map((item, index) => {
            return (
                <TransactionItem value={item} key={index} type={2} />
            )
          })
      }
    </Tab.Pane>
  );
};

export const TransactionItem = (props) => {
  return ( 
    <div className="card p-0 m-2">
        <div className="row m-0">
                <div className= "col-sm-2" style={{height:50, padding: "13px 15px", borderLeft: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.type === 1 ? props.value.ReceiverNumber : props.value.SenderNumber}</p>
                </div>
                <div className= "col-sm-2" style={{height:50, padding: "13px 15px", borderLeft: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.type === 1 ? props.value.ReceiverName : props.value.SenderName}</p>
                </div>
                <div className= "col-sm-2" style={{height:50, padding: "13px 15px", borderLeft: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px", color: props.type === 1 ? 'red' : 'green'}}>{props.type === 1 ? "- $" +props.value.Money : "+ $" +props.value.Money}</p>
                </div>
                <div className= "col-sm-2 " style={{height:50, padding: "13px 15px", borderLeft: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.value.DateSend.slice(0,10)}</p>
                </div>
                <div className= "col-sm-3" style={{height:50, padding: "13px 15px", borderLeft: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.value.Content}</p>
                </div>
            </div>
    </div>
  );
};
