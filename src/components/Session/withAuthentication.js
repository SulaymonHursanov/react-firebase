import React from 'react';
import AuthUserContext from "./context";
import {withFirebase} from "../Firebase";
import * as ROUTES from '../constants/routes'
import {compose} from "recompose";
import {connect} from "react-redux";


const withAuthentication   = Component => {

    class WithAuthentication extends React.Component {

        constructor(props) {
            super(props);

            this.props.onSetAuthUser(
                JSON.parse(localStorage.getItem('authUser')),
            );
        }


        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.props.onSetAuthUser(authUser);
                },
                ()=> {
                    localStorage.removeItem('authUser');
                    this.props.onSetAuthUser(null);
                }
            )
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
                return <Component {...this.props} />
        }
    }

    const mapStateToProps = state => ({
        authUser: state.sessionState.authUser,
    });

    const mapDispatchToProps = dispatch => ({
        onSetAuthUser: authUser =>
            dispatch({ type: 'AUTH_USER_SET', authUser }),
    });
    return compose(
        withFirebase,
        connect(
            mapStateToProps,
            mapDispatchToProps,
        ),
    )(WithAuthentication);

};

export default withAuthentication;