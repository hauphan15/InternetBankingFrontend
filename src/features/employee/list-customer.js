import React, { useEffect, useState } from 'react';
import {HeadList, ListItem, Pagination} from './list-item';
import PopUp from './popup';

const ListCustomer = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [chooseCustomer, setChooseCustomer] = useState(-1);
    function receiverChoose (ID) {
        setChooseCustomer(ID);
    }
    const Load = () => {
        let lastI = currentPage * 8;
        let firstI = lastI - 8;
        const lst = props.list.slice(firstI, lastI);
        return(
            lst.map((item, key) => {
                return (
                    <ListItem value={item} key={key} sendchoose={receiverChoose}/>
                );
            })
        );
    }

    return (
        <div className="card mt-2 shadow-lg" >
            <div style={{height:700}}>
                <HeadList/>
                <hr style={{margin:0}}/>
                {Load()}
            </div>
            <div className="d-flex justify-content-end pr-3">
                <Pagination currentpage={currentPage}/>
            </div>
            {
                chooseCustomer == -1 ? <div/> : <PopUp ID={chooseCustomer} sendchoose={receiverChoose} />
            }
        </div>
    );
}

export default ListCustomer;