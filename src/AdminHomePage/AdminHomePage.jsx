import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { adminActions, userActions, studentActions, dueActions } from '../_actions';

class AdminHomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getStudents();
        this.props.getDues();
        this.props.getAdmins();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    handleDeleteAdmin(id) {
        return (e) => this.props.deleteAdmin(id);
    }

    handleDeleteStudent(id) {
        return (e) => this.props.deleteStudent(id);
    }

    render() {

        const { admin, users, students, dues, admins } = this.props;
        return (
            <div>
                <div>
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/admin">Dueker</a>
                            </div>
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="/admin">Home</a></li>
                                <li className=""><a href="student-dues">Student Dues</a></li>
                                <li className=""><a href="register-admin">Register Admin</a></li>
                                <li className=""><a href="register-authority">Register Authority</a></li>
                                <li className=""><a href="register-student">Register Student</a></li>
                                <li style={{ marginLeft: "200px" }}><a> Hi, {admin.firstName}!</a></li>
                                <li><Link to="/admin-login">Logout</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <br />
                </div >

                <div className="col-md-10 col-md-offset-1">

                    <center><h4>Registered Admins</h4></center>
                    {admins.loading && <em>Loading admins...</em>}
                    {admins.error && <span className="text-danger">ERROR: {admins.error}</span>}
                    {admins && admins.items &&
                        <table id="all-admins" className="table table-hover table-bordered">
                            <thead style={{ fontWeight: "bold", color: "white", background: "#2F4152" }}>
                                <tr>
                                    <td>Admin Name</td>
                                    <td>Username</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.items.map((adminEntry, index) =>
                                    adminEntry.username !== admin.username &&
                                    <tr key={adminEntry.id}>
                                        <td>{adminEntry.firstName + ' ' + adminEntry.lastName}</td>
                                        <td>{adminEntry.username}</td>
                                        <td>
                                            {
                                                adminEntry.deleting ? <em>Deleting...</em>
                                                    : adminEntry.deleteError ? <span className="text-danger">ERROR: {adminEntry.deleteError}</span>
                                                        : <a onClick={this.handleDeleteAdmin(adminEntry.id)}>Delete</a>
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    <Link to="/register-admin" className="btn btn-primary">Register New Admin</Link>

                    <center><h4>Registered Authorities</h4></center>
                    {users.loading && <em>Loading authorities...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users && users.items &&
                        <table id="all-authorities" className="table table-hover table-bordered">
                            <thead style={{ fontWeight: "bold", color: "white", background: "#2F4152" }}>
                                <tr>
                                    <td>Authority Name</td>
                                    <td>Username</td>
                                    <td>Department</td>
                                    <td>Designation</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {users.items.map((user, index) =>
                                    <tr key={user.id}>
                                        <td>{user.firstName + ' ' + user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.authorityDept}</td>
                                        <td>{user.authorityDesig}</td>
                                        <td>
                                            {
                                                user.deleting ? <em>Deleting...</em>
                                                    : user.deleteError ? <span className="text-danger">ERROR: {user.deleteError}</span>
                                                        : <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    <Link to="/register-authority" className="btn btn-primary">Register New Authority</Link>

                    <center><h4>Registered Students</h4></center>
                    {students.loading && <em>Loading students...</em>}
                    {students.error && <span className="text-danger">ERROR: {students.error}</span>}
                    {students.items &&
                        <table id="all-students" className="table table-hover table-bordered">
                            <thead style={{ fontWeight: "bold", color: "white", background: "#2F4152" }}>
                                <tr>
                                    <td>Student ID</td>
                                    <td>Name</td>
                                    <td>Course</td>
                                    <td>Batch</td>
                                    <td>DOB</td>
                                    <td>Mobile</td>
                                    <td>Email</td>
                                    <td>Address</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {students.items.map((student, index) =>
                                    <tr key={student.id}>
                                        <td>{student.studentId}</td>
                                        <td>{student.firstName + ' ' + student.lastName}</td>
                                        <td>{student.course}</td>
                                        <td>{student.batch}</td>
                                        <td>{student.dob}</td>
                                        <td>{student.mobile}</td>
                                        <td>{student.email}</td>
                                        <td>{student.address}</td>
                                        <td>
                                            {
                                                student.deleting ? <em>Deleting...</em>
                                                    : student.deleteError ? <span className="text-danger">ERROR: {student.deleteError}</span>
                                                        : <a onClick={this.handleDeleteStudent(student.id)}>Delete</a>
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    <Link to="/register-student" className="btn btn-primary">Register New Student</Link>

                </div>
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

const connectedAdminHomePage = connect(mapState, actionCreators)(AdminHomePage);
export { connectedAdminHomePage as AdminHomePage };

// Dueker - Developed by Sanyam Jain