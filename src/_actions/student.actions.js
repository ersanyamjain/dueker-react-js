import { studentConstants } from '../_constants';
import { studentService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const studentActions = {
    register,
    getAll,
    delete: _delete
};

function register(student) {
    return dispatch => {
        dispatch(request(student));

        studentService.register(student)
            .then(
                student => {
                    dispatch(success());
                    history.push('/admin');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(student) { return { type: studentConstants.ST_REGISTER_REQUEST, student } }
    function success(student) { return { type: studentConstants.ST_REGISTER_SUCCESS, student } }
    function failure(error) { return { type: studentConstants.ST_REGISTER_FAILURE, error } }
}

function getAll() {

    return dispatch => {
        dispatch(request());

        studentService.getAll()
            .then(
                students => dispatch(success(students)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: studentConstants.ST_GETALL_REQUEST } }
    function success(students) { return { type: studentConstants.ST_GETALL_SUCCESS, students } }
    function failure(error) { return { type: studentConstants.ST_GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        studentService.delete(id)
            .then(
                student => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: studentConstants.ST_DELETE_REQUEST, id } }
    function success(id) { return { type: studentConstants.ST_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: studentConstants.ST_DELETE_FAILURE, id, error } }
}

// Dueker - Developed by Sanyam Jain