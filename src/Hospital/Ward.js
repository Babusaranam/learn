
import axios from 'axios';
import React, { Component } from 'react';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';

class Ward extends Component {
    constructor() {
        super();
        this.state = {
            Wards: []

        }
    }
    componentDidMount() {
        axios.get("http://localhost:8080/hospitalApp/ward/all")
            .then((response) => {
                console.log("a", response)
                // if (response.data.length > 0) {
                this.setState({
                    Wards: response.data
                })
                // }
            })
    }

    render() {
        console.log(this.state.Wards)
        const { Wards } = this.state
        return (
            <Container className="m-5">
                <Row>
                    {Wards.map((item, index) => {
                        return (

                            <Col md={4}>
                                <Card>
                                    <Card.Header className=" box1 Light font-weight-bold"> {item.wardType}</Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col md={5}>
                                                <p className="text-danger font-weight-bold"> TotalBeds</p>
                                            </Col>
                                            <Col md={1}>
                                                <p className="text-danger">:</p>
                                            </Col>
                                            <Col md={2}>
                                                <p className="text-danger font-weight-bold"> {item.totalBeds}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={5}>
                                                <p className="text-success font-weight-bold"> AvaliableBeds</p>
                                            </Col>
                                            <Col md={1}>
                                                <p className="text-success">:</p>
                                            </Col>
                                            <Col md={2}>
                                                <p className="text-success font-weight-bold"> {item.availableBeds}</p>
                                            </Col>
                                        </Row>

                                        <Button className="box" type="submit">View</Button>


                                    </Card.Body>
                                </Card>
                            </Col>


                        )
                    }
                    )
                    }
                </Row>
            </Container >
        );
    }
}

export default Ward;