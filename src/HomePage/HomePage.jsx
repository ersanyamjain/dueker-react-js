import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, studentActions, dueActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getStudents();
        this.props.getDues();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    handleDeleteStudent(id) {
        return (e) => this.props.deleteStudent(id);
    }

    handleClearDue(due) {
        var date = new Date()
        due.receivedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        due.received = true
        this.props.clearDue(due);
    }

    handleDeleteDue(id) {
        this.props.deleteDue(id);
    }

    render() {

        const { user, students, dues } = this.props;
        this.studentIdNameMap = new Map()
        if (students.items) {
            for (let ind = 0; ind < students.items.length; ind++) {
                this.studentIdNameMap.set(students.items[ind].studentId,
                    {
                        name: students.items[ind].firstName + ' ' + students.items[ind].lastName,
                        course: students.items[ind].course,
                        batch: students.items[ind].batch,
                        mobile: students.items[ind].mobile
                    })
            }
        }

        return (

            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Dueker</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="/">Home</a></li>
                            <li className=""><a href="add-due">Add Due</a></li>
                            <li style={{ marginLeft: "650px" }}><a> Welcome {user.firstName}!</a></li>
                            <li><Link to="/login">Logout</Link></li>
                        </ul>
                    </div>
                </nav>

                <div className="col-md-10 col-md-offset-1">

                    <center><h4>All Dues</h4></center>
                    {dues.loading && <em>Loading dues...</em>}
                    {dues.error && <span className="text-danger">ERROR: {dues.error}</span>}
                    {dues.items &&
                        <table id="all-dues" className="table table-hover table-bordered">
                            <thead style={{ fontWeight: "bold", color: "white", background: "#2F4152" }}>
                                <tr>
                                    <td>Item Name</td>
                                    <td>Added On</td>
                                    <td>Student ID</td>
                                    <td>Student Name</td>
                                    <td>Student Course</td>
                                    <td>Student Batch</td>
                                    <td>Student Mobile</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {dues.items.map((due, index) =>
                                    due.authorityUsername === user.username && due.received === false &&
                                    <tr key={due.id}>
                                        <td>{due.dueItem}</td>
                                        <td>{due.date}</td>
                                        <td>{due.studentId}</td>
                                        <td>{this.studentIdNameMap.get(due.studentId).name}</td>
                                        <td>{this.studentIdNameMap.get(due.studentId).course}</td>
                                        <td>{this.studentIdNameMap.get(due.studentId).batch}</td>
                                        <td>{this.studentIdNameMap.get(due.studentId).mobile}</td>
                                        <td> {
                                            due.clearing ? <em>Clearing...</em>
                                                : due.clearError ? <span className="text-danger">ERROR: {due.clearError}</span>
                                                    : <span><a onClick={() => this.handleClearDue(due)}>Clear</a></span>
                                        }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    <Link to="/add-due" className="btn btn-primary">Add Due</Link>

                    <center><h4>Dues History</h4></center>
                    {dues.loading && <em>Loading dues history...</em>}
                    {dues.error && <span className="text-danger">ERROR: {dues.error}</span>}
                    {dues.items &&
                        <table id="cleared-dues" className="table table-hover table-bordered">
                            <thead style={{ fontWeight: "bold", color: "white", background: "#2F4152" }}>
                                <tr>
                                    <td>Item Name</td>
                                    <td>Added On</td>
                                    <td>Student ID</td>
                                    <td>Clearance Date</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {dues.items.map((due, index) =>
                                    due.authorityUsername === user.username && due.received === true &&
                                    <tr key={due.id}>
                                        <td>{due.dueItem}</td>
                                        <td>{due.date}</td>
                                        <td>{due.studentId}</td>
                                        <td>{due.receivedDate}</td>
                                        <td> {
                                            due.deleting ? <em>Deleting...</em>
                                                : due.deleteError ? <span className="text-danger">ERROR: {due.deleteError}</span>
                                                    : <a onClick={() => this.handleDeleteDue(due.id)}>Delete</a>
                                        }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                </div >
            </div>
        );
    }
}

function mapState(state) {
    const { users, students, dues, authentication } = state;
    const { user } = authentication;
    return { user, users, students, dues };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getStudents: studentActions.getAll,
    deleteStudent: studentActions.delete,
    getDues: dueActions.getAll,
    clearDue: dueActions.clear,
    deleteDue: dueActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

// Dueker - Developed by Sanyam Jain