import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateAccount() {
    const [fromvalues, SetFromValues] = useState({
        username: '', password: '', permission: 'customer', fullname: '', birthday: '', gender: '', address: '',
        phone: '', email: '', identificationcardid: ''
    });
    const [success, setSuccess] = useState(false);
    const [IsSubmit, setIsSubmit] = useState(false);
    useEffect(()=>{

    }, [IsSubmit])
    async function Register() {
        let response = await axios.post("http://localhost:3001/employee/create-customer-account", fromvalues);
        setSuccess(response.data.success);
        setIsSubmit(true);
        console.log(response);
    }
    return (
        <div className="container-fluid" style={{ padding: "0 120px" }} >
            <div className="card text-center mt-2 p-2"><h3>CreateAccount</h3></div>
            <div className="card" >
                <div>
                    <div className="from-header">
                        <h4 className="ml-2 mr-1">
                            Account
                        </h4>
                    </div>
                    <div className="row" style={{ padding: "10px 50px" }}>
                        <div className="col-sm-6 row  ">
                            <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >UserName</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input ml-3" id="" type="text" value={fromvalues.username}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, username: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                    <div className="row" style={{ padding: "10px 50px" }}>
                        <div className="col-sm-6 row  ">
                            <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >Password</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input ml-3" id="" type="" value={fromvalues.password}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, password: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-6">
                        </div>
                    </div>
                    <div className="from-header">
                        <h4 className="ml-2 mr-1">
                            Information
                        </h4>
                    </div>
                    <div className="row" style={{ padding: "10px 50px" }}>
                        <div className="col-sm-6 row  ">
                            <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >Identification Card</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input-number ml-3" id="" type="number" value={fromvalues.identificationcardid}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, identificationcardid: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-6 row">
                        <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >Phone</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input-number ml-3" id="" type="number" value={fromvalues.phone}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, phone: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ padding: "10px 50px" }}>
                        <div className="col-sm-6 row ">
                            <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >Full Name</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input ml-3" id="" type="text" value={fromvalues.fullname}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, fullname: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-6 row">
                        <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >Email</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input ml-3" id="" type="text" value={fromvalues.email}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, email: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ padding: "10px 50px" }}>
                        <div className="col-sm-6 row ">
                            <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >Birthday</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input ml-3" id="" type="text" value={fromvalues.birthday}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, birthday: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                        <div className="col-sm-6 row">
                        <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >Gender</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input ml-3" id="" type="text" value={fromvalues.gender}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, gender: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ padding: "10px 50px" }}>
                        <div className="col-sm-6 row ">
                            <div className="col-sm-3 m-0 p-0 text-right">
                                <label className="m-0  form-label"  >Address</label>

                            </div>
                            <div className="col-sm-8 text-left m-0 p-0">
                                <input className="form-input ml-3" id="" type="text" value={fromvalues.address}
                                    onChange={(e) => { SetFromValues({ ...fromvalues, address: e.target.value }) }}
                                ></input>
                            </div>
                        </div>
                        
                    </div>
                    <div className="row" style={{ padding: "10px 50px", marginTop:20, marginBottom: 50 }}>
                        <div className="col-sm-6 row ">
                            <div className="col-sm-3 m-0 p-0 text-right">

                            </div>
                            <div className="col-sm-9 text-left m-0 p-0">
                                {IsSubmit && !success ? <p style={{marginLeft:16, color: 'red'}}>
                                    create account failed!
                                </p> 
                                : <p style={{marginLeft:16, color: 'green'}}>
                                create account success!
                                </p> }
                                <button className="btn btn-outline-success" style={{marginLeft:16, width: 100}}
                                    onClick={() => Register()}>
                                     Create
                                </button>
                                <button className="btn btn-outline-danger" style={{marginLeft:16, width: 100}} 
                                    onClick={()=> {SetFromValues({
                                        username: '', password: '', permission: 'customer', fullname: '', birthday: '', gender: '', address: '',
                                        phone: '', email: '', identificationcardid: ''
                                    });}}
                                >Clear</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;