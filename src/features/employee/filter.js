import React, { useState } from 'react';

function SearchZone (props) {
    const [filter, setFitler] = useState({name: '', phone: '', cmnd: ''});
    const sendFilter =  () => {
        console.log(filter);
        props.sendFilter(filter);
    }
    return (
        <div style={{borderRadius:"10px"}} className="card mt-3 shadow-lg" >
            <div className="row" style={{margin: "20px 10px"}}>
                <div className="col-sm-3">
                    <input  type="text" placeholder="customer's name" value={filter.name}
                        style={{height: "100%", width: "100%", outline: 'none', borderRadius: 15, paddingLeft: 10}}
                        onChange={(e) => {setFitler({...filter, name: e.target.value})}} />
                </div>
                <div className="col-sm-3">
                    <input  type="text" placeholder="customer's identification ID" value={filter.cmnd}
                        style={{height: "100%", width: "100%", outline: 'none', borderRadius: 15, paddingLeft: 10}}
                        onChange={(e) => {setFitler({...filter, cmnd: e.target.value})}} />
                </div>
                <div className="col-sm-3">
                    <input  type="text" placeholder="customer's phone" value={filter.phone}
                        style={{height: "100%", width: "100%", outline: 'none', borderRadius: 15, paddingLeft: 10}}
                        onChange={(e) => {setFitler({...filter, phone: e.target.value})}} />
                </div> 
                <div className="col-sm-3">
                    <button className="btn btn-outline-primary"
                        onClick={() => sendFilter()}>
                        Search
                    </button>
                    <button className="btn btn-outline-danger ml-3"
                        onClick={() => {setFitler({name: '', phone: '', cmnd: ''});}}>
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchZone;