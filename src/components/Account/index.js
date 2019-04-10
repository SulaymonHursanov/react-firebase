import React from 'react';
import  {AuthUserContext, withAuthorization} from "../Session";

const Account = ()=> {
    return (
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
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
