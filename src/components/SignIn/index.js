import React from 'react';
import {SignUpLink} from "../SignUp";
import * as ROUTES from '../constants/routes'
import {withFirebase} from "../Firebase";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";


const SignInPage = ()=> {

    return (
        <div>
            <SignInForm/>
            <SignUpLink/>
        </div>
    );
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE}
    }



    onSubmit = (event)=> {
        const { email, password} = this.state;
        event.preventDefault();

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({...INITIAL_STATE})
                this.props.history.push(ROUTES.ROOT)
            })
            .catch(error => {
                this.setState({error: error.message})
            });

    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        const { error ,email, password } = this.props;
        const isInValid = email === '' || password === '';
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                           name={'email'}
                           onChange={this.onChange}
                           placeholder={'Email address'}
                           value={email}
                    />
                    <input type="password"
                           name={'password'}
                           onChange={this.onChange}
                           placeholder={'password'}
                           value={password}
                    />
                    <button disabled={isInValid} type={'submit'}>Sign in</button>
                </form>
                {error && <p>{error.message}</p>}
            </div>
        );
    }
}

// const SignInForm = withRouter(withFirebase(SignInFormBase));

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

export default SignInPage;