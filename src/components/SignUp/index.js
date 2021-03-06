import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { withFirebase} from './../Firebase'
import { compose } from "recompose";

import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

const SignUpPage = ()=> (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

class SignUpFormBase extends React.Component{
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onChangeCheckbox = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    onSubmit = event => {
        const {
            username,
            email,
            passwordOne,
            isAdmin,
        } = this.state;

        const roles = {};
        
        if (isAdmin){
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then( authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);

                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles,
                    });
            })
            .catch(error => {
                this.setState({error});
            });

        console.log('test')
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input name={'username'}
                       value={username}
                       onChange={this.onChange}
                       type={'text'}
                       placeholder={'Full name'}
                />
                <input name={'email'}
                       value={email}
                       onChange={this.onChange}
                       type={'text'}
                       placeholder="Email address"
                />
                <input name={'passwordOne'}
                       value={passwordOne}
                       onChange={this.onChange}
                       type={'password'}
                       placeholder="password"
                />
                <input name={'passwordTwo'}
                       value={passwordTwo}
                       onChange={this.onChange}
                       type={'password'}
                       placeholder="Confirm password"
                />
                <label>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                <button disabled={isInvalid} type={'submit'}>Sign up</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = ()=> (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

// const SignUpForm = withRouter(withFirebase(SignUpFormBase));
const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink }