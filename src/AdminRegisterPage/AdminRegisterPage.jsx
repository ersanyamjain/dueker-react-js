import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { adminActions } from '../_actions';

class AdminRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            admin: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { admin } = this.state;
        this.setState({
            admin: {
                ...admin,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { admin } = this.state;
        if (admin.firstName && admin.lastName && admin.username && admin.password) {
            this.props.register(admin);
        }
    }

    render() {
        const { registering, loggedInAdmin } = this.props;
        const { admin, submitted } = this.state;
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/admin">Dueker</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className=""><a href="/admin">Home</a></li>
                            <li className=""><a href="/student-dues">Student Dues</a></li>
                            <li className="active"><a href="register-admin">Register Admin</a></li>
                            <li className=""><a href="register-authority">Register Authority</a></li>
                            <li className=""><a href="register-student">Register Student</a></li>
                            <li style={{ marginLeft: "200px" }}><a> Hi, {admin.firstName}!</a></li>
                            <li><Link to="/admin-login">Logout</Link></li>
                        </ul>
                    </div>
                </nav>
                <br />


                <div className="col-md-6 col-md-offset-3">


                    <h2>Register An Admin</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !admin.firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={admin.firstName} onChange={this.handleChange} />
                            {submitted && !admin.firstName &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !admin.lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={admin.lastName} onChange={this.handleChange} />
                            {submitted && !admin.lastName &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !admin.username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={admin.username} onChange={this.handleChange} />
                            {submitted && !admin.username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !admin.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={admin.password} onChange={this.handleChange} />
                            {submitted && !admin.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>
                            {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/admin" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

function mapState(state) {
    const { registering } = state.adminRegistration;
    const loggedInAdmin = state.adminAuthentication.admin;
    return { registering, loggedInAdmin };
}

const actionCreators = {
    register: adminActions.register
}

const connectedAdminRegisterPage = connect(mapState, actionCreators)(AdminRegisterPage);
export { connectedAdminRegisterPage as AdminRegisterPage };

// Dueker - Developed by Sanyam Jain