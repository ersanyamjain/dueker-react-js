import { dueConstants } from '../_constants';
import { dueService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const dueActions = {
    add,
    getAll,
    clear,
    delete: _delete
};

function add(due) {
    return dispatch => {
        dispatch(request(due));

        dueService.add(due)
            .then(
                due => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(due) { return { type: dueConstants.DUE_ADD_REQUEST, due } }
    function success(due) { return { type: dueConstants.DUE_ADD_SUCCESS, due } }
    function failure(error) { return { type: dueConstants.DUE_ADD_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        dueService.getAll()
            .then(
                dues => dispatch(success(dues)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dueConstants.DUE_GETALL_REQUEST } }
    function success(dues) { return { type: dueConstants.DUE_GETALL_SUCCESS, dues } }
    function failure(error) { return { type: dueConstants.DUE_GETALL_FAILURE, error } }
}


function clear(due) {
    return dispatch => {
        dispatch(request(due));

        dueService.update(due)
            .then(
                due => {
                    dispatch(success(due)),
                        history.push('/');
                },
                error =>
                    dispatch(failure(due, error.toString()),
                        dispatch(alertActions.error(error.toString())))
            );
    };

    function request(due) { return { type: dueConstants.DUE_CLEAR_REQUEST, due } }
    function success(due) { return { type: dueConstants.DUE_CLEAR_SUCCESS, due } }
    function failure(error) { return { type: dueConstants.DUE_CLEAR_FAILURE, error } }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        dueService._delete(id)
            .then(
                due => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: dueConstants.DUE_DELETE_REQUEST, id } }
    function success(id) { return { type: dueConstants.DUE_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: dueConstants.DUE_DELETE_FAILURE, id, error } }
}

// Dueker - Developed by Sanyam Jain