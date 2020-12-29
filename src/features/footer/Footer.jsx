import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';

function Footer() {


    return (
        <div style={{backgroundColor:"white", marginTop:"150px"}}>
            {localStorage.access_token !=='' && localStorage.permission === 'customer'
            ?<div style={{color:"#24305E",marginLeft:"100px", marginRight:"100px"}}>
                <Row style={{paddingTop:"20px", marginLeft:"0"}}>
                    <Col xs={4} style={{padding:"0"}}>
                        <ul style={{listStyle:"none", padding:"0"}}>
                            <li style={{fontSize:"22px"}}><b>Internet Banking Application</b></li>
                            <li style={{fontSize:"14px", marginTop:"10px"}}>
                                We provide you the easiest way to transfer money to everyone. 
                                Let's connect with us by the following social networks </li>
                            <li style={{fontSize:"18px", marginTop:"8px", fontWeight:"600"}}>Social Networks:</li>
                            <li>
                                <ul style={{display:"flex", justifyContent:"space-around", padding:"0px 121px"}}>
                                    <li style={{display:"inline-block"}}><i style={{fontSize:"xx-large"}} className="fab fa-instagram-square"></i></li>
                                    <li style={{display:"inline-block"}}><i style={{fontSize:"xx-large"}} className="fab fa-facebook-square"></i></li>
                                    <li style={{display:"inline-block"}}><i style={{fontSize:"xx-large"}} className="fab fa-twitter-square"></i></li>
                                </ul>
                            </li>
                        </ul>
                    </Col>

                    <Col>
                        <ul style={{listStyle:"none", padding:"0"}}>
                            <li style={{fontSize:"16px"}}><b>Information</b></li>
                            <li style={{fontSize:"14px", marginTop:"10px"}}>About us</li>
                            <li style={{fontSize:"14px", marginTop:"10px"}}>Private policy</li>
                            <li style={{fontSize:"14px", marginTop:"10px"}}>Term and Conditions</li>
                        </ul>
                    </Col>

                    <Col>
                        <ul style={{listStyle:"none", padding:"0"}}>
                            <li style={{fontSize:"16px"}}><b>Contact us</b></li>
                            <li style={{fontSize:"14px", marginTop:"10px"}}><b style={{fontWeight:"500"}}>Address:</b> 227 Nguyen Van Cu Street, Ward 4, District 5, Ho Chi Minh City</li>
                            <li style={{fontSize:"14px", marginTop:"10px"}}><b style={{fontWeight:"500"}}>Email:</b> internetbankingapp@gmail.com</li>
                            <li style={{fontSize:"14px", marginTop:"10px"}}><b style={{fontWeight:"500"}}>Call us:</b> 0123456789</li>
                        </ul>
                    </Col>
                </Row>
                <Row style={{marginTop:"15px",marginLeft:"0"}}>
                    <h6 style={{fontSize:"13px", fontWeight:"700"}}>Copyright © 2020 Internet Banking. All Right Reserved</h6>
                </Row>  
            </div>
            :null}
        </div>
    );
}

export default Footer;