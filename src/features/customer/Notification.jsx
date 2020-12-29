import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ListGroup} from 'react-bootstrap';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    getAllShownNotificationAsync,
    deleteNotificationAsync
} from './customerSlice';

function Notification() {

    const notification = useSelector(state => state.customer.shownNotification);

    const [show, setShow] = useState(false);

    setTimeout(()=>{
        setShow(true);
    },2000)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllShownNotificationAsync());
    }, []);

    function handleRemoveNotification(object){
        dispatch(deleteNotificationAsync(object.ID));
    }

    return (
        <div style={{marginRight:"100px", marginLeft:"100px", marginTop:"40px", minHeight:"200px"}}>
            {show === true
            ?<div>
                {notification.length > 0
                ?<ListGroup variant="flush" style={{borderRadius:"10px"}}>
                    {notification.map((item) =>(
                    <ListGroup.Item key={item.ID}>
                        <ul style={{display:"flex",padding:"0" ,justifyContent:"space-between", listStyleType:"none", marginBottom:"0"}}>
                            <li style={{width:"200px"}}>Received {item.Money} $</li>
                            <li style={{width:"300px"}}>{item.Content}</li>
                            <li style={{width:"200px"}}>{item.Time}</li>
                            <li style={{cursor:"pointer"}} onClick={()=>handleRemoveNotification(item)}>
                                <DeleteOutlineIcon />
                            </li>
                        </ul>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                :<div style={{height:"300px"}}>
                    <h5 align="center">You have seen all notifications</h5>
                </div>}
            </div>
            :<div style={{textAlign:"center"}}>
                <CircularProgress/>
            </div>}

        </div>
    );
}

export default Notification;