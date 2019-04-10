import React from 'react';
import  {AuthUserContext, withAuthorization} from "../Session";
import {connect} from "react-redux";
import {compose} from "redux";

const Account = ({ authUser }) => (
        <AuthUserContext.Consumer>
            {authUser=> (
                <div>
                    Account page!
                    <br/>
                    Email: {authUser.email}
                </div>
            )}
        </AuthUserContext.Consumer>
);

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
});
const condition = authUser => !!authUser;

export default compose(
    connect(mapStateToProps),
    withAuthorization(condition),
)(Account);