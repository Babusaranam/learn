import React, { Component } from 'react'
import { Row, Col, Form, Button, Card, Container, Toast } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';

export default class AddDoc extends Component {

    constructor() {
        super();
        // let editData = this.props;
        // console.log("edit", editData)
        // if (editData.data == undefined) {
        this.state = {
            doctorId: "",
            Fname: "",
            Lname: "",
            email: "",
            mobileNumb: "",
            Available: "",
            Ward: "",
            Specialization: "",
            Fnameerror: "",
            Lnameerror: "",
            emailerror: "",
            mobileNumberror: "",
            Specializationerror: "",
            Availableerror: "",
            Warderror: "",
            error: false,
            isEdit: false,
            toastSuccess: false,
            toastmsg: "",
            isShow: false,

        }

    }

    handelAvaliable = (Available) => {
        let checkAvail;
        if (Available === "Yes") {
            checkAvail = true;
        }
        else if (Available === "No") {
            checkAvail = false;
        }
        return checkAvail;
    }



    handelText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handelClose = (event) => {
        this.setState({
            isShow: false
        })
        if (this.state.toastSuccess)
            this.props.history.push("/Doctors")
    }




    Validations() {
        let { emailerror, Fname, Lname, email, Available, Availableerror, Ward, Warderror, Specialization,
            Fnameerror, Lnameerror, mobileNumb, mobileNumberro, Specializationerror, error, toastmsg } = this.state;

        if (Fname.length === 0) {
            this.setState({
                Fnameerror: "Invalid Details",
                error: true
            })
        } else {
            this.setState({
                Fnameerror: "",
            })
        }
        if (Lname.length === 0) {
            this.setState({
                Lnameerror: "invalid Details",
                error: true
            })
        } else {
            this.setState({
                Lnameerror: ""
            })
        }
        if (email.length === 0) {
            this.setState({
                emailerror: "please provide email",
                error: true
            })
        } else {
            this.setState({
                emailerror: ""
            })
        }
        if (mobileNumb.length === 0) {
            this.setState({
                mobileNumberro: "enter number",
                error: true
            })
        } else if (mobileNumb.length < 10) {
            this.setState({
                mobileNumberro: "enter correct number",
                error: true
            })
        }
        else if (mobileNumb.length > 10) {
            this.setState({
                mobileNumberro: "enter correct number",
                error: true
            })
        }
        else {
            this.setState({
                mobileNumberro: "",
            })
        }
        if (Available.length === 0) {
            this.setState({
                Availableerror: "select any one filed",
                error: true
            })
        } else {
            this.setState({
                Availableerror: "",
            })
        } if (Specialization.length === 0) {
            this.setState({
                Specializationerror: "select any one",
                error: true
            })
        } else {
            this.setState({
                Specializationerror: "",

            })
        } if (Ward.length === 0) {
            this.setState({
                Warderror: "select any one",
                error: true
            })
        } else {
            this.setState({
                Warderror: "",
            })
        }

        if (Fname.length > 0 && Lname.length > 0 && email.length > 0
            && mobileNumb.length > 0 && mobileNumb.length === 10 && Specialization.length > 0 && Available.length > 0 && Ward.length > 0) {
            this.setState({
                Fnameerror: "",
                Lnameerror: "",
                emailerror: "",
                mobileNumberro: "",
                Warderror: "",
                Specializationerror: "",
                Availableerror: "",
                error: false
            })
        }

        return error
    }
    handelSubmit = (event) => {
        const { toastmsg, isEdit, Fname, Lname, email, doctorId, mobileNumb, Available, Specialization, Ward, isShow, toastSuccess } = this.state
        console.log("state", this.state)
        let isError = this.Validations();

        let checkAvail = this.handelAvaliable(Available);

        console.log("isError", isError)
        if (!isError) {
            if (!isEdit) {
                axios.post("http://localhost:8080/hospitalApp/doctor/save", {
                    fName: Fname,
                    lName: Lname,
                    emailId: email,
                    mobileNum: mobileNumb,
                    isAvailable: checkAvail,
                    specialization: Specialization,
                    wardId: Ward
                }).then((response) => {
                    console.log("b", response)
                    if (response.status === 200 && response.data) {
                        this.setState({
                            toastSuccess: true,
                            toastmsg: "Successfully saved data",
                            isShow: true
                        })

                    }
                    else if (isEdit) {
                        axios.put(`http://localhost:8080/hospitalApp/doctor/update/ ${doctorId}`, {

                            fName: Fname,
                            lName: Lname,
                            emailId: email,
                            mobileNum: mobileNumb,
                            isAvailable: checkAvail,
                            specialization: Specialization,
                            wardId: Ward,
                            doctorId: doctorId

                        }).then((response) => {
                            console.log(" put", response)
                            if (response.status === 200 && response.data) {
                                this.setState({
                                    toastSuccess: true,
                                    toastmsg: "Updated data successfully",
                                    isShow: true
                                })
                            }
                        })

                    }
                    else {
                        this.setState({
                            toastSuccess: false,
                            toastmsg: "Error Occurred",
                            isShow: true
                        })

                    }
                })
            }
        }
        console.log("submit",)
        // this.setState({
        //     toastmsg: "success",
        //     isShow: true,
        //     toastmsg: "Erorr occured",
        //     toastSuccess: true
        // })
    }
    render() {

        const { isEdit, error, Fname, Lname, Lnameerror, email, Available, Ward, Specialization, mobileNumb, Fnameerror, emailerror, Availableerror, mobileNumberro, Warderror, Specializationerror, toastmsg, isShow, toastSuccess } = this.state

        let editData = this.props;

        console.log("edit", this.props)
        if (editData.data) {
            let avail;
            let Availability = editData.data.isAvailable;
            if (Availability === true) {
                avail = "Yes";
            }
            else if (Availability === false) {
                avail = "No";
            }
            this.state = {

                isEdit: true,
                Fname: editData.data.fName,
                Lname: editData.data.lName,
                email: editData.data.emailId,
                mobileNumb: editData.data.mobileNum,
                Available: avail,
                doctorId: editData.data.doctorId,
                Specialization: editData.data.specialization,
                Ward: editData.data.wardId,

            }
            console.log("state", this.state)
        }

        let variant = "";
        if (toastSuccess) {
            variant = "success";
        }
        else {
            variant = "danger";
        }
        // const { currentData } = this.props;
        // const { Fname } = currentData;

        return (
            <div>
                <Container className="Dform" >
                    <div>
                        <Toast className=" babu" bg={variant} name="toastmsg" onClose={(event) => this.handelClose(event)} show={isShow}>

                            <Toast.Header>
                                Message
                            </Toast.Header>
                            <Toast.Body className='text-white'>
                                {toastmsg ? toastmsg : ""}
                            </Toast.Body>
                        </Toast>
                    </div>

                    <Form className="booo" >
                        <Col md={12}>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridfName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control value={this.state.Fname} type="text" placeholder="fName" name="Fname" onChange={(event) => this.handelText(event)} />
                                    <p className="text-danger"> {Fnameerror ? Fnameerror : ""}</p>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridlName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={this.state.Lname} placeholder="lName" name="Lname" onChange={(event) => this.handelText(event)} />
                                    <p className="text-danger"> {Lnameerror ? Lnameerror : ""}</p>
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridemail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={this.state.email} name="email" placeholder="@gmail.com" onChange={(event) => this.handelText(event)} />
                                    <p className="text-danger"> {emailerror ? emailerror : ""}</p>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Specialization</Form.Label>
                                    <Form.Select name="Specialization" value={this.state.Specialization} onChange={(event) => this.handelText(event)}>
                                        <option value=""></option>
                                        <option value="Dental">Dental</option>
                                        <option value="Cardio">Cardio</option>
                                        <option value="Diagnostic">Diagnostic</option>
                                        <option value="ENT">ENT</option>
                                    </Form.Select>
                                    <p className="text-danger"> {Specializationerror ? Specializationerror : ""}</p>
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Available</Form.Label>
                                    <Form.Select value={this.state.Available} name="Available" onChange={(event) => this.handelText(event, this.handelAvaliable)}>
                                        <option value=""></option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                    <p className="text-danger"> {Availableerror ? Availableerror : ""}</p>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridNumber">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control type="number" value={this.state.mobileNumb} placeholder="Mobile" name="mobileNumb" onChange={(event) => this.handelText(event)} />
                                    <p className="text-danger"> {mobileNumberro ? mobileNumberro : ""}</p>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="formGridZip">
                                        <Form.Label >Ward</Form.Label>
                                        <Form.Select value={this.state.Ward} name="Ward" onChange={(event) => this.handelText(event)}>
                                            <option value="" ></option>

                                            <option value="1">General</option>
                                            <option value="2">ICU</option>
                                            <option value="3">NIA</option>
                                        </Form.Select>
                                        <p className="text-danger"> {Warderror ? Warderror : ""}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Button variant="primary" type="button" name="button" onClick={(event) => this.handelSubmit(event)}>
                                    {isEdit ? "Update" : "Submit"}
                                </Button>
                                <Link to="/Doctors" >  <Button variant="danger" className="mx-4" type="button" >
                                    Cancel
                                </Button></Link>
                            </Form.Group>
                        </Col>
                    </Form >

                </Container>
            </div >
        )
    }
}
