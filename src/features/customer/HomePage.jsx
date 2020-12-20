import React from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';

 function HomePage() {
    return (
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: 'auto',borderRadius:"15px"}}>
                            <Card.Body>
                                <Card.Title>Checking Account</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">0123456789</Card.Subtitle>
                                <h2>50000 $</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: 'auto' ,borderRadius:"15px"}}>
                            <Card.Body>
                                <Card.Title style={{color:"green"}}><i style={{marginRight:"10px"}} className="fas fa-arrow-right"></i>Money In</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Current Month</Card.Subtitle>
                                <h2>50000 $</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: 'auto',borderRadius:"15px" }}>
                            <Card.Body>
                                <Card.Title style={{color:"red"}}><i style={{marginRight:"10px"}} className="fas fa-arrow-left"></i>Money Out</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Current Month</Card.Subtitle>
                                <h2>50000 $</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default HomePage