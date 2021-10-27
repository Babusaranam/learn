import axios from 'axios';
import React, { Component } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

export default class Hospital extends Component {
    constructor() {
        super();
        this.state = {
            hosp: "",
            totalBeds: "",
            availBeds: ""
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8080/hospitalApp/hospital")
            .then((response) => {
                console.log({ response })
                if (response.data) {
                    this.setState({
                        hosp: response.data.hospName,
                        totalBeds: response.data.totalBeds,
                        availBeds: response.data.availableBeds
                    })
                }
            })
    }

    render() {
        const { hosp, availBeds, totalBeds, } = this.state
        return (
            <div >

                <Card style={{ width: '45rem', marginLeft: "10rem", marginTop: "2rem" }}>
                    <Card.Header className=" box1 font-weight-bold"> {hosp}</Card.Header>
                    <Card.Body>

                        <Container>
                            <Row>
                                <Col md={3}>
                                    <p className="text-success">
                                        AvaliableBeds
                                    </p>
                                </Col>
                                <Col md={2}>
                                    <p className="text-success">
                                        :
                                    </p>
                                </Col>
                                <Col md={2}>
                                    <p className="text-success font-weight-bold">
                                        {availBeds}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <p className="text-danger  ">
                                        TotalBeds
                                    </p>
                                </Col>

                                <Col md={2}>
                                    <p className="text-success">
                                        :
                                    </p>
                                </Col>
                                <Col md={2}>
                                    <p className="text-danger font-weight-bold">
                                        {totalBeds}
                                    </p>
                                </Col>
                            </Row>

                        </Container>
                    </Card.Body>
                </Card>

            </div >
        )
    }
}
