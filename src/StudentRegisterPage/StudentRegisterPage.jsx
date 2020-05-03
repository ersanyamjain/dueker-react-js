import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { studentActions } from '../_actions';

class StudentRegisterPage extends React.Component {
    constructor(props) {
        super(props);
        const year = (new Date()).getFullYear();
        this.years = Array.from(new Array(10), (val, index) => year - index);
        this.courses = ["B.Tech - CSE", "B.Tech - ECE", "B.Tech - ME", "B.Tech - CE",
            "M.Tech - CSE", "M.Tech - ECE", "M.Tech - ME", "M.Tech - CE"]

        this.state = {
            student: {
                studentId: '',
                firstName: '',
                lastName: '',
                dob: '',
                course: '',
                batch: '',
                mobile: '',
                address: '',
                email: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isCourseSelected = this.isCourseSelected.bind(this);
        this.isBatchSelected = this.isBatchSelected.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { student } = this.state;
        this.setState({
            student: {
                ...student,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { student } = this.state;

        if (student.firstName && student.lastName && student.studentId && student.course && student.batch && student.dob
            && student.email && student.address && student.mobile) {
            this.props.register(student);
        }
    }

    isCourseSelected(value) {
        if (this.state.student.course === value) {
            return 'selected'
        }
        return ''
    }

    isBatchSelected(value) {
        if (this.state.student.batch === value) {
            return 'selected'
        }
        return ''
    }

    render() {
        const { registering, loggedInAdmin } = this.props;
        const { student, submitted } = this.state;
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
                            <li className=""><a href="register-authority">Register Authority</a></li>
                            <li className="active"><a href="register-student">Register Student</a></li>
                            <li style={{ marginLeft: "200px" }}><a> Hi, {loggedInAdmin.firstName}!</a></li>
                            <li><Link to="/admin-login">Logout</Link></li>
                        </ul>
                    </div>
                </nav>
                <br />
                <div className="col-md-6 col-md-offset-3">
                    <h2>Register A Student</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !student.studentId ? ' has-error' : '')}>
                            <label htmlFor="studentId">Student ID</label>
                            <input type="text" className="form-control" name="studentId" value={student.studentId} onChange={this.handleChange} />
                            {submitted && !student.studentId &&
                                <div className="help-block">Student ID is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !student.firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={student.firstName} onChange={this.handleChange} />
                            {submitted && !student.firstName &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !student.lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={student.lastName} onChange={this.handleChange} />
                            {submitted && !student.lastName &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !student.dob ? ' has-error' : '')}>
                            <label htmlFor="lastName">Date of Birth</label>
                            <input type="date" className="form-control" name="dob" value={student.dob} onChange={this.handleChange} />
                            {submitted && !student.dob &&
                                <div className="help-block">Date of Birth is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !student.course ? ' has-error' : '')}>
                            <label htmlFor="course">Course</label>
                            <select className="form-control" id="course" name="course" onChange={this.handleChange}>
                                <option value="" selected={this.isCourseSelected("")} disabled hidden>-- Select --</option>
                                {
                                    this.courses.map((course, index) => {
                                        return <option value={course} selected={this.isCourseSelected(course)}>{course}</option>
                                    })
                                }
                            </select>
                            {submitted && !student.course &&
                                <div className="help-block">Course is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !student.batch ? ' has-error' : '')}>
                            <label htmlFor="batch">Batch</label>
                            <select className="form-control" id="batch" name="batch" onChange={this.handleChange}>
                                <option value="" selected={this.isBatchSelected("")} disabled hidden>-- Select --</option>
                                {
                                    this.years.map((year, index) => {
                                        return <option value={year} selected={this.isBatchSelected(year)}>{year}</option>
                                    })
                                }
                            </select>
                            {submitted && !student.batch &&
                                <div className="help-block">Batch is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !student.email ? ' has-error' : '')}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" className="form-control" name="email" value={student.email} onChange={this.handleChange} />
                            {submitted && !student.email &&
                                <div className="help-block">Email Address is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !student.mobile ? ' has-error' : '')}>
                            <label htmlFor="mobile">Mobile Number</label>
                            <input type="text" className="form-control" name="mobile" value={student.mobile} onChange={this.handleChange} />
                            {submitted && !student.mobile &&
                                <div className="help-block">Mobile Number is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !student.address ? ' has-error' : '')}>
                            <label htmlFor="address">Address</label>
                            <input type="address" className="form-control" name="address" value={student.address} onChange={this.handleChange} />
                            {submitted && !student.address &&
                                <div className="help-block">Address is required</div>
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
    const { registering } = state.studentRegistration;
    const loggedInAdmin = state.adminAuthentication.admin;
    return { registering, loggedInAdmin };
}

const actionCreators = {
    register: studentActions.register
}

const connectedStudentRegisterPage = connect(mapState, actionCreators)(StudentRegisterPage);
export { connectedStudentRegisterPage as StudentRegisterPage };

// Dueker - Developed by Sanyam Jain