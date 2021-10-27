import React, { Component } from 'react'
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap"
import { Link } from 'react-router-dom'


export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            high: "/hospital"
        }
    }
    handelClick = (key) => {
        console.log("event", key)
        this.setState({
            high: "ward"
        })
    }
    render() {
        const { high } = this.state;
        return (

            <div className="bg-dark text-dark " >
                <Nav variant="tabs" defaultActiveKey="/hospital">
                    <div className="d-flex">
                        <Nav.Item>
                            <Nav.Link className=" box3 font-weight-bold " eventKey="link-1" href="/Home">OMEGA</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className=" box4" eventKey="link-1" href="/hospital">Hospital</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className=" box4" eventKey="link-1" href="/Ward">Ward</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link className=" box4" eventKey="link-1" href="/Doctors">Doctors</Nav.Link>
                        </Nav.Item>
                    </div>

                    <div className="box5">

                        <NavDropdown title="hello" id="nav-dropdown">

                            <Nav.Link className=" box4" eventKey="link-1" href="/Logout">Logout</Nav.Link>

                        </NavDropdown>
                    </div>

                </Nav>
            </div >

        )
    }
}
