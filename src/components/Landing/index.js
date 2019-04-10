import React from 'react';
import {withAuthorization} from "../Session";


const Root = ()=> {
    return (
        <div>
            Root
            <p>The Home Page is accessible by every signed in user.</p>
        </div>
    );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Root);
