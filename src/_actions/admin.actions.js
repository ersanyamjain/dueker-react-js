import { adminConstants } from '../_constants';
import { adminService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const adminActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        adminService.login(username, password)
            .then(
                admin => {
                    dispatch(success(admin));
                    history.push('/admin');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(admin) { return { type: adminConstants.ADMIN_LOGIN_REQUEST, admin } }
    function success(admin) { return { type: adminConstants.ADMIN_LOGIN_SUCCESS, admin } }
    function failure(error) { return { type: adminConstants.ADMIN_LOGIN_FAILURE, error } }
}

function logout() {
    adminService.logout();
    return { type: adminConstants.ADMIN_LOGOUT };
}

function register(admin) {
    return dispatch => {
        dispatch(request(admin));

        adminService.register(admin)
            .then(
                admin => {
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

    function request(admin) { return { type: adminConstants.ADMIN_REGISTER_REQUEST, admin } }
    function success(admin) { return { type: adminConstants.ADMIN_REGISTER_SUCCESS, admin } }
    function failure(error) { return { type: adminConstants.ADMIN_REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        adminService.getAll()
            .then(
                admins => dispatch(success(admins)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: adminConstants.ADMIN_GETALL_REQUEST } }
    function success(admins) { return { type: adminConstants.ADMIN_GETALL_SUCCESS, admins } }
    function failure(error) { return { type: adminConstants.ADMIN_GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        adminService.delete(id)
            .then(
                admin => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: adminConstants.ADMIN_DELETE_REQUEST, id } }
    function success(id) { return { type: adminConstants.ADMIN_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: adminConstants.ADMIN_DELETE_FAILURE, id, error } }
}

// Dueker - Developed by Sanyam Jain