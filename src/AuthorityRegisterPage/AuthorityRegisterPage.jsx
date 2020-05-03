import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class AuthorityRegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.authorities = ["Library", "Departmental Lab", "Accounts Section", "Admin Office",
            "Attendence", "Sports Incharge", "Hostel Warden", "Hostel Mess"]

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                authorityDept: '',
                authorityDesig: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isAuthorityDeptSelected = this.isAuthorityDeptSelected.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.authorityDept && user.authorityDesig && user.username && user.password) {
            this.props.register(user);
        }
    }

    isAuthorityDeptSelected(value) {
        if (this.state.user.authorityDept === value) {
            return 'selected'
        }
        return ''
    }

    render() {
        const { registering, loggedInAdmin } = this.props;
        const { user, submitted } = this.state;
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
                            <li className=""><a href="register-admin">Register Admin</a></li>
                            <li className="active"><a href="register-authority">Register Authority</a></li>
                            <li className=""><a href="register-student">Register Student</a></li>
                            <li style={{ marginLeft: "200px" }}><a> Hi, {loggedInAdmin.firstName}!</a></li>
                            <li><Link to="/admin-login">Logout</Link></li>
                        </ul>
                    </div>
                </nav>
                <br />
                <div className="col-md-6 col-md-offset-3">
                    <h2>Register An Authority</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                            {submitted && !user.firstName &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                            {submitted && !user.lastName &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.authorityDept ? ' has-error' : '')}>
                            <label htmlFor="authorityDept">Authority Department</label>
                            <select className="form-control" id="authorityDept" name="authorityDept" onChange={this.handleChange}>
                                <option value="" selected={this.isAuthorityDeptSelected("")} disabled hidden>-- Select --</option>
                                {
                                    this.authorities.map((authority, index) => {
                                        return <option value={authority} selected={this.isAuthorityDeptSelected(authority)}>{authority}</option>
                                    })
                                }
                            </select>
                            {submitted && !user.authorityDept &&
                                <div className="help-block">Authority Department is required</div>
                            }
                            {/* <input type="text" className="form-control" name="authorityDept" value={user.authorityDept} onChange={this.handleChange} /> */}

                        </div>
                        <div className={'form-group' + (submitted && !user.authorityDesig ? ' has-error' : '')}>
                            <label htmlFor="authorityDesig">Authority Designation</label>
                            <input type="text" className="form-control" name="authorityDesig" value={user.authorityDesig} onChange={this.handleChange} />
                            {submitted && !user.authorityDesig &&
                                <div className="help-block">Authority Designation is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                            {submitted && !user.username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
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
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.userRegistration;
    const loggedInAdmin = state.adminAuthentication.admin;
    return { registering, loggedInAdmin };
}

const actionCreators = {
    register: userActions.register
}

const connectedAuthorityRegisterPage = connect(mapState, actionCreators)(AuthorityRegisterPage);
export { connectedAuthorityRegisterPage as AuthorityRegisterPage };

// Dueker - Developed by Sanyam Jain