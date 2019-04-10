import React from 'react'
import {Link} from 'react-router-dom'
import SignOut from '../SignOut'

import * as ROUTES from '../constants/routes'
import { AuthUserContext, withAuthentication } from "../Session";
import * as ROLES from '../constants/roles';
import {connect} from "react-redux";

const Navigation = ({authUser})=> {
    return (authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth/>);
};

const NavigationAuth = ({authUser})=> {
    return (
            <ul>
                <li>
                    <Link to={ROUTES.ROOT}>Root</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
                {!!authUser.roles[ROLES.ADMIN] && (
                    <li>
                        <Link to={ROUTES.ADMIN}>Admin</Link>
                    </li>
                )}
                <li>
                    <SignOut/>
                </li>
            </ul>
    );
};

const NavigationNonAuth = (props) => {
    return (
          <ul>
              <li>
                  <Link to={ROUTES.HOME}>Home</Link>
              </li>
              <li>
                  <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
              </li>
              <li>
                  <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              </li>

          </ul>
    );
};
const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);