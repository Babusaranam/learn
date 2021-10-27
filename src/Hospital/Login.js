import React, { Component } from 'react';
import Doclogo from "./Doc.png";
import { Form, Button, Card, Toast } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { withRouter } from 'react-router';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "admin",
            password: "admin",
            error: "",
            usernameError: "",
            passwordError: "",
            toastmsg: "",
            // secureToken: "4Yyjd7AK",
            secureToken: "",
            isShow: false,
            isValid: true,
            isLoggedin: false,
            toastSuccess: false
        }
    }

    handelChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,

        })
    }

    validate() {
        let { username, usernameError, password, passwordError, isValid, toastmsg } = this.state
        if (username.length < 8 && username.length > 0 && password.length > 8 && password.length > 0) {
            this.setState({
                usernameError: "",
                passwordError: "",
                isValid: true
            })
        }

        else {
            if (username.length === 0) {
                this.setState({
                    usernameError: "Name field is required",
                    isValid: false
                })
            }
            else if (username.length >= 8) {
                this.setState({
                    usernameError: "Exceeded limit",
                    isValid: false
                })
            }
            else {
                this.setState({
                    usernameError: ""
                })
            }

            if (password.length === 0) {
                this.setState({
                    passwordError: "Password field is required",
                    isValid: false,

                })

            }
            else if (password.length >= 8) {
                this.setState({
                    passwordError: "Exceeded limit",
                    isValid: false
                })
            }
            else {
                this.setState({
                    passwordError: ""
                })
            }
        }
        console.log(this.state.username)
        console.log("dd", passwordError)
        return isValid;
    }

    handelClose = () => {
        //const { show } = this.state
        this.setState({
            isShow: false
        })
    }
    handelSubmit = (event) => {
        // event.preventDefault();
        // console.log(this.validate())
        this.validate()

        const { username, password, isValid, toastmsg, toastSuccess, secureToken, isShow, userName } = this.state


        axios.post("http://localhost:8080/hospitalApp/welcome/login", {
            userName: username,
            password: password

        }).then(response => {
            console.log(response)

            if (response.data.status === "200" && response.data.message === "SUCCESS" && userName === "admin" && password === "admin") {
                localStorage.setItem("secureToken ")
                clg
                this.props.history.push("/Hospital"),

                    // this.setState({
                    //     isLoggedin= true,

                    // })

                    // localStorage.getItem(secureToken);
                    // localStorage.setItem(userName = "admin")
                    // localStorage.getItem(userName)
                    // console.log("lstorage", localStorage)
                    this.props.history.push("/Hospital")
                toast("successfully login in")


                // this.setState({
                //     isLoggedin=true,
                //     this.props.history.push("/Hospital"),
                //     toast("successfully login in")
                //  })

            } else {
                this.setState({
                    toastmsg: "Invalid Credentials",
                    isShow: true

                })

            }
        })

    }


    render() {
        const { usernameError, passwordError, isValid, toastmsg, isShow } = this.state
        console.log("err", this.state.usernameError)


        return (
            <>

                <div className="d-flex m-2">
                    <div>
                        <Card style={{ width: '40rem', height: '35rem' }}>
                            <Card.Img variant="top" src={Doclogo} alert="Doclogo" height="550rem" />

                        </Card>
                    </div>
                    <div>
                        <Card style={{ width: '40rem', height: '35rem ', }}>
                            <Card.Body >
                                <Toast className="d-inline-block m-1 bg-danger" onClose={() => this.handelClose()} show={isShow}>
                                    <Toast.Header>
                                        <strong>message</strong>
                                    </Toast.Header>
                                    <Toast.Body className='text-white'>
                                        {toastmsg ? toastmsg : ""}
                                    </Toast.Body>
                                </Toast>
                                <Form className="box">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Userame</Form.Label>
                                        <Form.Control type="text" placeholder="Username" name="username" onChange={(event) => this.handelChange(event)} />

                                        <span className="text-danger">{usernameError !== "" ? usernameError : ""}</span>

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="password" placeholder="password" name="password" onChange={(event) => this.handelChange(event)} />
                                        <span className="text-danger">{passwordError !== "" ? passwordError : ""} </span>

                                    </Form.Group>

                                    <Button variant="primary" value="submit" onClick={(event) => this.handelSubmit(event)}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

            </>
        );
    }
}

export default withRouter(Login);