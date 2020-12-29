import React, { useEffect } from 'react';
import PopUp from './popup';

export const ListItem = (props) => {
    return (
        <div className="card list-item m-2" onClick={() => {props.sendchoose(props.value.ID)}} >
            <div className="row m-0">
                <div className= "col-sm-2" style={{height:50, padding: "13px 15px", borderRight: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.value.IdentificationCardID}</p>
                </div>
                <div className= "col-sm-2" style={{height:50, padding: "13px 15px", borderRight: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.value.FullName}</p>
                </div>
                <div className= "col-sm-2 " style={{height:50, padding: "13px 15px", borderRight: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.value.Gender}</p>
                </div>
                <div className= "col-sm-2" style={{height:50, padding: "13px 15px", borderRight: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.value.Phone}</p>
                </div>
                <div className= "col-sm-3" style={{height:50, padding: "13px 15px", borderRight: "1px solid #f0f0f0"}}>
                    <p style={{marginLeft: "30px"}}>{props.value.Email}</p>
                </div>
            </div>
        </div>
    );
}

export const HeadList = (props) => {
    return (
        <div className="row m-2">
            <div className= "col-sm-2" style={{borderRight: "1px solid #f0f0f0"}}>
                <h6 style={{marginLeft:30}}>Identification ID</h6>
            </div>
            <div className= "col-sm-2" style={{borderRight: "1px solid #f0f0f0"}}>
                <h6 style={{marginLeft:30}}>Full Name</h6>
            </div>
            <div className= "col-sm-2" style={{borderRight: "1px solid #f0f0f0"}}>
                <h6 style={{marginLeft:30}}>Gender</h6>
            </div>
            <div className= "col-sm-2" style={{borderRight: "1px solid #f0f0f0"}}>
                <h6 style={{marginLeft:30}}>phone</h6>
            </div>
            <div className= "col-sm-3" style={{borderRight: "1px solid #f0f0f0"}}>
                <h6 style={{marginLeft:30}}>Email</h6>
            </div>
        </div>
    );
}

export const Pagination = (props) => {
    useEffect(() => {
        console.log(props);
    }, []);
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item mr-1 ${props.currentpage === 1?"disabled":""}`}><a className="page-link" href="#">Previous</a></li>
                <li className="page-item mr-1"><a className="page-link" style={{background: 'blue'}} href="#">{props.currentpage}</a></li>
                <li className={`page-item mr-1 ${props.currentpage === 1?"disabled":""}`}><a className="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    );
}