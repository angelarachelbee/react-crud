import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import DefaultLayout from "../../layouts/defaultLayout";
import { Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from 'yup';
import store from "../../redux/store";
import * as actions from "../../redux/actions/index";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      formFields: {
          password: '',
          email: '',
      }
  };
  }


  render() {
    const handleSubmit = (values) => {    
      Axios.post('https://reqres.in/api/login', { email: values.email, password: values.password }).then(response => {
        localStorage.setItem('auth', JSON.stringify(response.data.token));
        store.dispatch(actions.login(response.data));
        window.location.reload(false); //redirection must work well @TODO
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
        .label('Email')
    });
    return (
      <DefaultLayout title={"Login"}>
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
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Text className="text-muted">
                    <span>Don't have an account? <NavLink exact to='/signup'> Sign up</NavLink> </span>
                    <span>Already have an account? <NavLink exact to='/login'> Log in</NavLink> </span>

                  </Form.Text>
                </Form.Group>
                {formikProps.isSubmitting ? (
                  <Spinner animation="border" />
                ) : (
                    <Button variant="dark" type="submit" onClick={formikProps.handleSubmit}>Log In</Button>
                  )}
              </React.Fragment>
            )}
          </Formik>
        </div>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(
  mapStateToProps,
  null
)(Login);


