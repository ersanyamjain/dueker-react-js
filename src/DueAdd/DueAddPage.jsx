import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { dueActions } from '../_actions';

class DueAddPage extends React.Component {
    constructor(props) {
        super(props);

        var date = new Date()
        this.fDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        this.authUserName = ''
        if (this.props.user && this.props.user.username) {
            this.authUserName = this.props.user.username
        }

        this.state = {
            due: {
                studentId: '',
                authorityUsername: this.authUserName,
                dueItem: '',
                date: this.fDate,
                received: false,
                receivedDate: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { due } = this.state;
        this.setState({
            due: {
                ...due,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { due } = this.state;

        if (due.studentId && due.authorityUsername && due.dueItem && due.date) {
            this.props.add(due);
        }
    }

    render() {
        const { registering, user } = this.props;
        const { due, submitted } = this.state;
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Dueker</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className=""><a href="/">Home</a></li>
                            <li className="active"><a href="add-due">Add Due</a></li>
                            <li style={{ marginLeft: "650px" }}><a> Welcome {user.firstName}!</a></li>
                            <li><Link to="/login">Logout</Link></li>
                        </ul>
                    </div>
                </nav>

                <div className="col-md-6 col-md-offset-3">
                    <h2>Add A Due</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !due.studentId ? ' has-error' : '')}>
                            <label htmlFor="studentId">Student ID</label>
                            <input type="text" className="form-control" name="studentId" value={due.studentId} onChange={this.handleChange} />
                            {submitted && !due.studentId &&
                                <div className="help-block">Student ID is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !due.item ? ' has-error' : '')}>
                            <label htmlFor="firstName">Due Item</label>
                            <input type="text" className="form-control" name="dueItem" value={due.dueItem} onChange={this.handleChange} />
                            {submitted && !due.dueItem &&
                                <div className="help-block">Due Item is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Add</button>
                            {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { registering, authentication } = state;
    const { user } = authentication;
    return { registering, user };
}

const actionCreators = {
    add: dueActions.add
}

const connectedDueAddPage = connect(mapState, actionCreators)(DueAddPage);
export { connectedDueAddPage as DueAddPage };

// Dueker - Developed by Sanyam Jain