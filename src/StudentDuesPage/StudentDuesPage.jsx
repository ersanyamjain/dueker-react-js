import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { adminActions, userActions, studentActions, dueActions } from '../_actions';

class StudentDuesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                studentId: '',
            },
            submitted: false,
            searching: false,
            studentDues: [],
            studentData: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [name]: value
            }
        });
    }

    handlePrintCmd(event) {

        var content = document.getElementById("dues-data-div");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        // Get HTML head element 
        var head = pri.document.getElementsByTagName('HEAD')[0];  
        // Create new link Element 
        var link = pri.document.createElement('link'); 
        // set the attributes for link element  
        link.rel = 'stylesheet';  
        link.type = 'text/css'; 
        link.href = 'https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';  
        // Append link element to HTML head 
        head.appendChild(link);

        pri.document.close();
        pri.focus();
        pri.print();
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            submitted: true,
            studentDues: [],
            studentData: {}
        });
        const { students, users, dues } = this.props;
        const { formData, studentDues } = this.state;
        let studentDuesNew = []

        if (formData.studentId) {

            for (let ind = 0; ind < students.items.length; ind++) {
                if (students.items[ind].studentId === formData.studentId) {
                    this.setState({ studentData: students.items[ind] });
                    break;
                }
            }
            for (let ind = 0; ind < dues.items.length; ind++) {
                
                if (dues.items[ind].studentId === formData.studentId && dues.items[ind].received === false) {
                    let studentDue = dues.items[ind]
                    for (let ind1 = 0; ind1 < users.items.length; ind1++) {
                        if (dues.items[ind].authorityUsername === users.items[ind1].username) {
                            studentDue.authDesignation = users.items[ind1].authorityDesig
                            studentDue.authDepartment = users.items[ind1].authorityDept
                            studentDue.authName = users.items[ind1].firstName + ' ' + users.items[ind1].lastName
                            break;
                        }
                    }

                    studentDuesNew = studentDuesNew.concat(studentDue)
                }
            }
        }

        this.setState({
            studentDues: studentDuesNew
        });
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.getStudents();
        this.props.getDues();
        this.props.getAdmins();
    }

    render() {

        const { admin } = this.props;
        const { formData, searching, submitted, studentData, studentDues } = this.state;
        var date = new Date()
        let fDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()

        return (

            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/admin">Dueker</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><a href="/admin">Home</a></li>
                            <li className="active"><a href="student-dues">Student Dues</a></li>
                            <li className=""><a href="register-admin">Register Admin</a></li>
                            <li className=""><a href="register-authority">Register Authority</a></li>
                            <li className=""><a href="register-student">Register Student</a></li>
                            <li style={{ marginLeft: "200px" }}><a> Hi, {admin.firstName}!</a></li>
                            <li><Link to="/admin-login">Logout</Link></li>
                        </ul>
                    </div>
                </nav>


                <div className="col-md-8 col-md-offset-2">

                    <div className="">
                        <h2>Check Dues:</h2>
                        <br />
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !formData.studentId ? ' has-error' : '')}>
                                <label htmlFor="studentId">Student ID</label>
                                <input type="text" className="form-control" name="studentId" value={formData.studentId} onChange={this.handleChange} />
                                {submitted && !formData.studentId &&
                                    <div className="help-block">Student ID is required</div>
                                }
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary">Search</button>
                                {searching &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <Link to="/admin" className="btn btn-link">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <br></br>
                    {submitted && studentData.studentId &&
                        <button type='button' align='right' className='btn btn-success btn-sm' onClick={this.handlePrintCmd}>Print Details</button>
                    }
                    <br />
                    <div id='dues-data-div'>
                        Date: {fDate} <br /><br />
                        <div className="">
                            {submitted && studentData.studentId &&
                                <div>
                                    <center><h4>Student Info</h4></center>
                                    <table id="student-data" className="table">
                                        <tbody>
                                            <tr>
                                                <th style={{ fontWeight: "bold" }}>
                                                    Student ID
                                                </th>
                                                <td>{studentData.studentId}</td>
                                                <th style={{ fontWeight: "bold" }}>
                                                    Name
                                                </th>
                                                <td>{studentData.firstName + ' ' + studentData.lastName}</td>
                                            </tr>

                                            <tr>
                                                <th style={{ fontWeight: "bold" }}>
                                                    Course
                                                </th>
                                                <td>{studentData.course}</td>
                                                <th style={{ fontWeight: "bold" }}>
                                                    Batch
                                                </th>
                                                <td>{studentData.batch}</td>
                                            </tr>

                                            <tr>
                                                <th style={{ fontWeight: "bold" }}>
                                                    Mobile
                                                </th>
                                                <td>{studentData.mobile}</td>
                                                <th style={{ fontWeight: "bold" }}>
                                                    Email
                                                </th>
                                                <td>{studentData.email}</td>
                                            </tr>

                                            <tr>
                                                <th style={{ fontWeight: "bold" }}>
                                                    DOB
                                                </th>
                                                <td>{studentData.dob}</td>
                                                <th style={{ fontWeight: "bold" }}>
                                                    Address
                                                </th>
                                                <td>{studentData.address}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            }
                            {submitted && !studentData.studentId &&
                                <center>
                                    <h4>Student Info</h4>
                                    <div className="help-block">No record found</div>
                                </center>
                            }
                        </div>

                        <div className="">
                            {submitted && studentDues.length > 0 &&
                                <div>
                                    <center><h4>Dues</h4></center>
                                    <table id="student-dues" className="table table-hover table-bordered">
                                        <thead style={{ fontWeight: "bold" }}>
                                            <tr>
                                                <td>Item Name</td>
                                                <td>Added On</td>
                                                <td>Department</td>
                                                <td>Authority Name</td>
                                                <td>Authority Designation</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentDues.map((studentDue, index) =>
                                                <tr key={studentDue.id}>
                                                    <td>{studentDue.dueItem}</td>
                                                    <td>{studentDue.date}</td>
                                                    <td>{studentDue.authDepartment}</td>
                                                    <td>{studentDue.authName}</td>
                                                    <td>{studentDue.authDesignation}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                            }
                            {submitted && !studentData.studentId && studentDues.length == 0 &&
                                <div>
                                    <center><h4>Dues</h4>
                                        <div className="help-block">No record found</div>
                                    </center>
                                </div>

                            }
                            {submitted && studentData.studentId && studentDues.length == 0 &&
                                <div>
                                    <center><h4>Dues</h4>
                                        <div className=""><b> All the dues are clear!</b></div>
                                    </center>
                                </div>
                            }
                        </div>
                    </div>
                    <iframe id="ifmcontentstoprint" style={{ height: '0px', width: '0px', position: 'absolute', display: 'none' }}></iframe>
                </div >
            </div>
        );
    }
}

function mapState(state) {
    const { users, students, dues, adminAuthentication, admins } = state;
    const { admin } = adminAuthentication;
    return { admins, admin, users, students, dues };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getStudents: studentActions.getAll,
    deleteStudent: studentActions.delete,
    getDues: dueActions.getAll,
    getAdmins: adminActions.getAll,
    deleteAdmin: adminActions.delete
}

const connectedStudentDuesPage = connect(mapState, actionCreators)(StudentDuesPage);
export { connectedStudentDuesPage as StudentDuesPage };

// Dueker - Developed by Sanyam Jain