import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from 'yup';
import DefaultLayout from "../../layouts/defaultLayout";
import { NavLink } from "react-router-dom";

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            formFields: {
                password: '',
                repassword: '',
                email: '',
            }
        };
    }

    componentDidMount() {
    }

    render() {
        const handleSubmit = (values, actions) => {
            Axios.post('https://reqres.in/api/register', values).then(response => {
                alert('Successfully registered');
                window.location.replace("/login");
            });
        };

        const validationSchema = yup.object().shape({
            password: yup
                .string()
                .required()
                .label('Password')
                .max(50, 'Maximum Length Is 50 Characters'),
            email: yup
                .string()
                .email("Email Is Not Valid")
                .required()
                .label('Email'),
            repassword: yup
                .string()
                .required()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
        });
        return (
            <>
                <DefaultLayout title={"Sign Up"}>
                    <h2>Sign Up</h2>
                    <div className="form-box">
                        <Formik initialValues={this.state.formFields} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
                            {formikProps => (
                                <React.Fragment>
                                    <Form.Group md="6" controlId="email">
                                        <Form.Label column={"required"}>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" name={"email"} value={formikProps.values.email} onChange={e => { formikProps.handleChange(e); }} />
                                        <div className={"invalid"}>{formikProps.errors.email}</div>
                                    </Form.Group>

                                    <Form.Group md="6" controlId="password">
                                        <Form.Label column={"required"}>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name={"password"}
                                            value={formikProps.values.password} onChange={e => { formikProps.handleChange(e); }} />
                                        <div className={"invalid"}>{formikProps.errors.password}</div>
                                    </Form.Group>

                                    <Form.Group md="6" controlId="repassword">
                                        <Form.Label column={"required"}>Retype Password</Form.Label>
                                        <Form.Control type="password" placeholder="Retype Password" name={"repassword"}
                                            value={formikProps.values.repassword} onChange={e => { formikProps.handleChange(e); }} />
                                        <div className={"invalid"}>{formikProps.errors.repassword}</div>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Text className="text-muted">
                                            <span>Already have an account? <NavLink exact to='/login'> Log in</NavLink> </span>

                                        </Form.Text>
                                    </Form.Group>
                                    {formikProps.isSubmitting ? (
                                        <Spinner animation="border" />
                                    ) : (
                                            <Button variant="dark" type="submit" onClick={formikProps.handleSubmit}>Sign Up</Button>
                                        )}
                                </React.Fragment>
                            )}
                        </Formik>
                    </div>
                </DefaultLayout>
            </>
        );
    }
}

export default connect(null, null)(SignUp);
