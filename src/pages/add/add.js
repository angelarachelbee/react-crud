import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { bindActionCreators } from "redux";

import { Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from 'yup';
import store from "../../redux/store";
import DefaultLayout from "../../layouts/defaultLayout";
import * as actions from "../../redux/actions/index";

export class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            formFields: {
                first_name: '',
                last_name: '',
                email: '',
                avatar: '',
            }
        };

    }

  componentDidMount() {
     
  }
    render() {
        const handleSubmit = (values) => {
            Axios.post('https://reqres.in/api/users', values).then(response => {
                const state = store.getState();
                const getUserList = state.userList;
                const newID = Date.now();
                const newUser = {
                    id: newID,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    avatar: 'https://i.pinimg.com/originals/00/2d/57/002d5714c44f88a16c1f0bdfa97ca05e.jpg'
                };
                getUserList.unshift(newUser);
                //TODO .... if there is no user. will request a list of users
                store.dispatch(actions.set(getUserList));
                this.props.history.push('/home')
            });
        };

        const validationSchema = yup.object().shape({
            first_name: yup
                .string()
                .required()
                .label('First Name')
                .max(50, 'Maximum Length Is 50 Characters'),
            last_name: yup
                .string()
                .required()
                .label('Last Name')
                .max(50, 'Maximum Length Is 50 Characters'),
            email: yup
                .string()
                .email("Email Is Not Valid")
                .required()
                .label('Email'),
        });
        return (
            <>
                <DefaultLayout title={"Add"}>
                 <h2>Add User</h2>
                    <div className="form-box">
                        <Formik initialValues={this.state.formFields} onSubmit={handleSubmit} validationSchema={validationSchema}>
                            {formikProps => (
                                <React.Fragment>
                                    <Form.Group md="6" controlId="email">
                                        <Form.Label column={"required"}>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" name={"email"} value={formikProps.values.email} onChange={e => { formikProps.handleChange(e); }} />
                                        <div className={"invalid"}>{formikProps.errors.email}</div>
                                    </Form.Group>

                                    <Form.Group md="6" controlId="first_name">
                                        <Form.Label column={"required"}>First Name</Form.Label>
                                        <Form.Control type="text" placeholder="First Name" name={"first_name"}
                                            value={formikProps.values.first_name} onChange={e => { formikProps.handleChange(e); }} />
                                        <div className={"invalid"}>{formikProps.errors.first_name}</div>
                                    </Form.Group>

                                    <Form.Group md="6" controlId="last_name">
                                        <Form.Label column={"required"}>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Last Name" name={"last_name"} value={formikProps.values.last_name} onChange={e => { formikProps.handleChange(e); }} />
                                        <div className={"invalid"}>{formikProps.errors.last_name}</div>
                                    </Form.Group>

                                    {formikProps.isSubmitting ? (
                                        <Spinner animation="border" />
                                    ) : (
                                            <Button variant="dark" type="submit" onClick={formikProps.handleSubmit}>Save</Button>
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

const mapStateToProps = state => ({
    loading: state.loading,
    userList: state.userList
  });
  const mapDispatchToProps = dispatch => {
    const {  set  } = actions;
    return bindActionCreators({ set }, dispatch);
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Add);
