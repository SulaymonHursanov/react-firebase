import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../constants/routes';
import AuthUserContext from './context';
import {connect} from "react-redux";

const withAuthorization = condition => Component => {

    class WithAuthorization extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }


        render() {
            return condition(this.props.authUser) ? (
                <Component {...this.props} />
            ) : null;
        }
    }

    const mapStateToProps = state => ({
        authUser: state.sessionState.authUser,
    });

    return compose(
        withRouter,
        withFirebase,
        connect(mapStateToProps),
    )(WithAuthorization);
};

export default withAuthorization;