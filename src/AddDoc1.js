import React, { Component } from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';



// const Mylocation = () => {

//     let location = useLocation();
//     return (
//         location.state
//     )
//     console.log(Mylocation);
// }


class AddDoc1 extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.isEdit = false;
        const { location } = this.props;
        if (location.state != undefined) {
            console.log("loc", location)
            this.isEdit = true
            this.state = {
                firstname: location.state.detail.fName,
                lastname: location.state.detail.lName,
                mobilenumber: location.state.detail.mobileNum,
                Email: location.state.detail.emailId,
                Ward: location.state.detail.wardId,
                Available: location.state.detail.isAvailable,
                speciality: location.state.detail.specialization,
                formErrors: {},
                loading: false,
                doctorId: location.state.detail.doctorId,
            }
        }
        else {
            this.state = {
                firstname: '',
                lastname: '',
                mobilenumber: '',
                Email: '',
                Ward: '',
                Available: '',
                speciality: '',
                formErrors: {},
                loading: false,

                isEdit: false

            }
        }
        this.initialState = this.state;

        console.log('location', this.state)
    }




    handleFormValidation() {
        const { firstname, lastname, mobilenumber, Email, speciality, Available, Ward } = this.state;
        let formErrors = {};
        let formIsValid = true;

        if (!firstname) {
            formIsValid = false;
            formErrors["firstnameErr"] = "Name is required.";
        }



        if (!lastname) {
            formIsValid = false;
            formErrors["lastnameErr"] = "Name is required.";
        }
        if (!mobilenumber.length) {
            formIsValid = false;
            formErrors["mobilenumberErr"] = "mobile number is required.";
        }
        // --regex pattern--
        else {
            var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
            if (!mobPattern.test(mobilenumber)) {
                formIsValid = false;
                formErrors["mobilenumberErr"] = "Invalid mobilenumber ";
            }
        }

        if (!Email) {
            formIsValid = false;
            formErrors["EmailErr"] = "Email id is required.";
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))) {

            formIsValid = false;
            formErrors["EmailErr"] = "Invalid Email ";
        }
        if (speciality === '' || speciality === "select") {
            formIsValid = false;
            formErrors["specialityErr"] = "Select speciality";
        }

        if (Available === '' || Available === "select") {
            formIsValid = false;
            formErrors["AvailableErr"] = "Select Available";
        }

        if (Ward === '' || Ward === "select") {
            formIsValid = false;
            formErrors["WardErr"] = "Select Ward";
        }


        this.setState({ formErrors: formErrors });

        return formIsValid;
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            // formValues: {
            ...this.state.formValues,
            [name]: value,


        })

    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { firstname, lastname, mobilenumber, Email, speciality, Available, Ward, doctorId } = this.state;

        // console.log('alert', this.state.formErrors)
        console.log('alert', doctorId)
        if (this.handleFormValidation()) {

            this.setState({ loading: true })
            if (this.isEdit === false) {
                axios.post('http://localhost:8080/hospitalApp/doctor/save', {
                    fName: firstname,
                    lName: lastname,
                    mobileNum: mobilenumber,
                    specialization: speciality,
                    isAvailable: Available,
                    emailId: Email,
                    wardId: Ward

                })
                    .then(response => {
                        console.log("get", response)

                        this.setState({ loading: false })
                        if (response.status === 200)
                            // props.history.push('/Home');
                            this.props.history.push('/Doctors');
                        else
                            alert("Something went wrong. Please try again later.");
                    })
                    .catch(error => {

                        alert("Something went wrong. Please try again later.");
                    });
            } else {
                axios.put("http://localhost:8080/hospitalApp/doctor/update/" + doctorId, {
                    fName: firstname,
                    lName: lastname,
                    mobileNum: mobilenumber,
                    specialization: speciality,
                    isAvailable: Available,
                    emailId: Email,
                    wardId: Ward,
                    doctorId: doctorId

                })
                    .then(response => {
                        console.log("put", response)

                        this.setState({ loading: false })
                        if (response.status === 200)
                            // props.history.push('/Home');
                            this.props.history.push('/Doctors');
                        else
                            alert("Something went wrong. Please try again later.");
                    })
                    .catch(error => {

                        alert("Something went wrong. Please try again later.");
                    });
            }
        }


    }
    render() {
        const { firstnameErr, lastnameErr, EmailErr, WardErr, AvailableErr, mobilenumberErr, specialityErr } = this.state.formErrors;
        const { firstname, lastname, mobilenumber, Email, speciality, Available, Ward } = this.state;
        const { isEdit } = this.isEdit;
        console.log('edit', this.isEdit)
        return (
            <div className="doct-new" >

                <div className="container ">

                    <div className="border border-primary doc-form m-5 p-4">
                        <h3 className="m-2 mb-4 text-primary">Doctor Registration </h3>
                        <form onSubmit={(e) => this.handleSubmit(e)}>

                            <div className="form-row  ">
                                <div className=" form-group col-md-4">
                                    <label >FirstName*

                                    </label>
                                    <input type="text"
                                        name="firstname"
                                        value={firstname}

                                        onChange={(fName) => this.handleChange(fName)}

                                        className="form-control" placeholder="firstName"
                                        error={firstnameErr ? ' firstnameErr' : ''} />


                                    {firstnameErr &&
                                        <div style={{ color: "red", paddingBottom: 10 }}>{firstnameErr}</div>
                                    }
                                </div>
                                <div className="form-group col-md-4">
                                    <label >LastName*</label>
                                    <input type="text" name="lastname" value={lastname} onChange={this.handleChange} className="form-control" placeholder="LastName" error={lastnameErr ? ' firstnameErr' : ''} />
                                    {lastnameErr && <div style={{ color: "red", paddingBottom: 10 }}>{lastnameErr}</div>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label >Mobile Number*</label>
                                    <input type='text' name="mobilenumber" maxLength="10"
                                        value={mobilenumber}
                                        onChange={this.handleChange}
                                        className="form-control" placeholder="Mobile"
                                        error={mobilenumberErr ? ' showError' : ''} />
                                    {mobilenumberErr && <div style={{ color: "red", paddingBottom: 10 }}>{mobilenumberErr}</div>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label >Email</label>
                                    <input type="text" name="Email"
                                        className="form-control" placeholder="Email"
                                        value={Email}
                                        onChange={this.handleChange}
                                        error={EmailErr ? ' showError' : ''} />
                                    {EmailErr &&
                                        <div style={{ color: "red", paddingBottom: 10 }}>{EmailErr}</div>
                                    }

                                </div>
                            </div>

                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <label>Specialization</label>
                                    <select className="form-control" name="speciality"
                                        value={speciality}
                                        onChange={this.handleChange}
                                        error={specialityErr ? ' showError' : ''}     >
                                        {/* {this.state.speciality.map((option) => (
                                            <option value={option.value}>{option.label}</option>
                                        ))} */}

                                        <option value="select" >Choose...</option>
                                        <option value="Dental" >Dental  </option>

                                        <option value="Cardio">Cardio</option>
                                        <option value="Diagnostic">Diagnostic</option>
                                        <option value="ENT">ENT</option>

                                    </select>
                                    {specialityErr &&
                                        <div style={{ color: "red", paddingBottom: 10 }}>{specialityErr}</div>
                                    }
                                </div>
                                <div className="form-group col-md-4">
                                    <label >Available</label>
                                    <select className="form-control" value={Available} onChange={this.handleChange}
                                        error={AvailableErr ? ' showError' : ''}
                                        name="Available">
                                        <option value="select">Choose...</option>
                                        <option value='true'>yes</option>
                                        <option value='false'>No</option>
                                    </select>
                                    {AvailableErr &&
                                        <div style={{ color: "red", paddingBottom: 1 }}>{AvailableErr}</div>
                                    }
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label >Ward</label>
                                    <select className="form-control"
                                        error={WardErr ? ' showError' : ''}
                                        name="Ward"
                                        onChange={this.handleChange} value={Ward}>

                                        {/* {this.state.Ward.map((option) => (

                                            <option value={option.value}>{option.label}</option>
                                        ))} */}
                                        <option value="select">Choose...</option>
                                        <option value="1">General </option>
                                        <option value="2">ICU</option>
                                        <option value="3">NID</option>
                                    </select>
                                    {WardErr &&
                                        <div style={{ color: "red", paddingBottom: 10 }}>{WardErr}</div>
                                    }
                                </div>


                                <div className="form-group my-4  col-md-6 col-sd-12">


                                    < button

                                        type="submit" className=" m-2 px-5 btn btn-primary"
                                    >
                                        {this.isEdit ? 'Update' : 'Submit'}</button>



                                    {/* < button type="submit" className=" m-2 px-5 btn btn-primary" >submit</button> */}



                                    <Link to="/Doctors" type="button" className="m-2 px-5 btn btn-light">Cancel</Link>
                                </div>

                            </div>


                        </form>
                    </div>
                </div >
            </div >

        )
    }
}

export default withRouter(AddDoc1);