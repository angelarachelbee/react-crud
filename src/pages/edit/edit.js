import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { Button, Form, Spinner } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from 'yup';
import { bindActionCreators } from "redux";
import store from "../../redux/store";
import * as actions from "../../redux/actions/index";
import DefaultLayout from "../../layouts/defaultLayout";


export class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            formFields: {
            }
        };
        this.setState({
            formFields: {
                first_name: '',
                last_name: '',
                email: '',
                avatar: '',
                id: ''
            }
        });
    }



    componentDidMount() {
        this.request(this.props.match.params.id);
    }

    request  (id)  {
        const state = store.getState();
        const getUserList = state.userList;
        const user = getUserList.find(item => item.id === parseInt(id));

        if (user === undefined) {
            Axios.get('https://reqres.in/api/users/' + id).then(response => {
                this.setState({
                    formFields: {
                        first_name: response.data.data.first_name,
                        last_name: response.data.data.last_name,
                        email: response.data.data.email,
                        avatar: response.data.data.avatar,
                        id
                    }
                });
            });
        } else {
            store.dispatch(actions.setUser(user));
            this.setState({
                formFields: user
            });
        }
    };

    render() {
        const handleSubmit = (values) => {
            Axios.patch('https://reqres.in/api/users/' + values.id, values).then(response => {
                const newUser = {
                    id: parseInt(values.id),
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    avatar: values.avatar
                };

                const state = store.getState();
                const getUserList = state.userList;
                const newUserArray = [newUser];
                const newUserList = getUserList.map(obj => newUserArray.find(o => o.id === obj.id) || obj);
                store.dispatch(actions.set(newUserList));
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
                <DefaultLayout title={"Edit"}>
                <h2>Update User</h2>
                    <img src={this.state.formFields.avatar} alt="test" width="200" />
                    <div className="form-box">
                        <Formik initialValues={this.state.formFields} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
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
    user: state.user,
    userList: state.userList,
});
const mapDispatchToProps = dispatch => {
    const { get, update } = actions;
    return bindActionCreators({ get, update }, dispatch);
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);
