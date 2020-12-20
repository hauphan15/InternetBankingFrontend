import React from 'react';
import {Container, Row, Col,Card} from 'react-bootstrap';

function Footer() {
    return (
        <div style={{backgroundColor:"#343a40"}}>
            <Container style={{color:"white"}}>
                <Row style={{paddingTop:"20px"}}>
                    <Col xs={4} style={{padding:"0"}}>
                        <ul style={{listStyle:"none", padding:"0"}}>
                            <li style={{fontSize:"22px"}}><b>Internet Banking Application</b></li>
                            <li style={{fontSize:"14px", marginTop:"10px"}}>
                                We provide you the easiest way to transfer money to everyone. 
                                Let's connect with us by following soical network </li>
                            <li style={{fontSize:"18px", marginTop:"8px"}}>Social Network</li>
                            <li>
                                <ul style={{display:"flex", justifyContent:"space-around", padding:"0px 121px"}}>
                                    <li style={{display:"inline-block"}}><i style={{fontSize:"xx-large"}} className="fab fa-instagram-square"></i></li>
                                    <li style={{display:"inline-block"}}><i style={{fontSize:"xx-large"}} className="fab fa-facebook-square"></i></li>
                                    <li style={{display:"inline-block"}}><i style={{fontSize:"xx-large"}} class="fab fa-twitter-square"></i></li>
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
                <Row style={{marginTop:"15px"}}>
                    <h6 style={{fontSize:"13px"}}>Copyright © 2020 Internet Banking Application. All Right Reserved</h6>
                </Row>  
            </Container>
        </div>
    );
}

export default Footer;