import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminPrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('admin')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/admin-login', state: { from: props.location } }} />
    )} />
)

// Dueker - Developed by Sanyam Jain