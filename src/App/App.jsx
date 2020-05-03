import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { AdminPrivateRoute } from '../_components';
import { AdminHomePage } from '../AdminHomePage';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { AdminLoginPage } from '../AdminLoginPage';
import { AdminRegisterPage } from '../AdminRegisterPage';
import { StudentDuesPage } from '../StudentDuesPage';
import { AuthorityRegisterPage } from '../AuthorityRegisterPage';
import { StudentRegisterPage } from '../StudentRegisterPage';
import { DueAddPage } from '../DueAdd/DueAddPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;

        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <AdminPrivateRoute exact path="/admin" component={AdminHomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/admin-login" component={AdminLoginPage} />
                                <AdminPrivateRoute path="/register-admin" component={AdminRegisterPage} />
                                <AdminPrivateRoute path="/register-authority" component={AuthorityRegisterPage} />
                                <AdminPrivateRoute path="/register-student" component={StudentRegisterPage} />
                                <AdminPrivateRoute path="/student-dues" component={StudentDuesPage} />
                                <PrivateRoute path="/add-due" component={DueAddPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

// Dueker - Developed by Sanyam Jain