import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Container, Table, Row, Col, Button, Card, Popover, OverlayTrigger } from 'react-bootstrap'

import { Link } from 'react-router-dom';


class Doctors extends Component {
    constructor() {
        super();
        this.state = {
            doc: [],
            show: true,

        }
    }
    handelAvailable = (value) => {
        if (value = true) {
            return "y"
        } else {
            return "N"
        }

    }

    handelEdit = (item) => {
        console.log("d", this.state)
        this.setState({
            currentEdit: item
        })

    }

    handelDelete = (Id) => {

        console.log({ Id })
        axios.delete(`http://localhost:8080/hospitalApp/doctor/${Id}`)

            .then((response) => {
                this.componentDidMount()
            })

    }


    componentDidMount() {
        axios.get("http://localhost:8080/hospitalApp/doctor/all")
            .then((response) => {
                console.log({ response })
                this.setState({
                    doc: response.data
                })
            })
    }

    // handleEdit = (item) => {
    //     const { handleEdit, history } = this.props;
    //     console.log(this.props)
    //     handleEdit(item);
    //     history.push('/AddDoc1')
    // }

    handleEdit = (item) => {
        var id = item.doctorId;
        this.props.history.push({ pathname: `/AddDoc1/${id}`, state: { detail: item } })

        console.log("item", item)
    }

    render(props) {
        const { doc, overlayShow, AddDoc } = this.state
        // console.log("what", this.state)
        const { handleEdit } = this.props;
        console.log("what", this.props)
        return (
            <>
                <div className="m-5">
                    <Card style={{ margin: '2rem' }}>
                        <Card.Body>
                            <Card.Header className=" box4  bg-primary text-white text-center">
                                <div className="d-flex">
                                    Doctors Data
                                    <div className="boo">
                                        Total No.Docs: {doc.length}
                                    </div>
                                </div>
                            </Card.Header>
                            < Link to="AddDoc1"><Button className="boxx" variant="primary">Add Doctor</Button></Link>
                            <div id="table-scroll">
                                <Table striped bordered hover variant="light" className="m-0 babu">
                                    <thead>
                                        <tr>
                                            <th>Serial No</th>
                                            <th>DoctorId</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Availability</th>
                                            <th>Specialization</th>
                                            <th>Mobilenumber</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    {doc.map((item, index) => {
                                        return (
                                            <tbody className="babu1">
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.doctorId}</td>
                                                    <td>{item.fName}</td>
                                                    <td>{item.lName}</td>
                                                    <td> {this.handelAvailable(item.isAvailable)}</td>
                                                    <td>{item.specialization}</td>
                                                    <td>{item.emailId}</td>
                                                    <td>{item.mobileNum} </td>
                                                    <td>   <Button variant="primary" onClick={(event) => this.handleEdit(item)}>Edit</Button></td>

                                                    <td>
                                                        <OverlayTrigger rootClose={true} placement="auto"
                                                            trigger="click" placement="top"
                                                            //  target={ReactDOM.findDOMNode(this.target)}
                                                            // ref={(button) => { this.target = button; }}
                                                            overlay={
                                                                <Popover id="popover-basic">
                                                                    <Popover.Header variant="danger" as="h3" >Are You Sure?</Popover.Header>
                                                                    <Popover.Body>
                                                                        <Row  >
                                                                            <Col>
                                                                                <Button variant="success"
                                                                                    onClick={(Id) => this.handelDelete(item.doctorId)} > Yes </Button>
                                                                            </Col>
                                                                            <Col>
                                                                                <Link to="/Doctors" > <Button variant="danger" > No </Button></Link>
                                                                            </Col>
                                                                        </Row >
                                                                    </Popover.Body>
                                                                </Popover >
                                                            }>
                                                            <Button variant="danger"> <i class="fas fa-trash"></i> </Button>
                                                        </OverlayTrigger>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </Table>
                            </div>
                        </Card.Body>
                    </Card >
                </div >
            </>
        )
    }
}
export default withRouter(Doctors)