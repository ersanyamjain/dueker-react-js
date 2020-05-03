import config from 'config';
import { authHeader } from '../_helpers';

export const adminService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/admins/authenticate`, requestOptions)
        .then(handleResponse)
        .then(admin => {
            // store admin details and jwt token in local storage to keep admin logged in between page refreshes
            localStorage.setItem('admin', JSON.stringify(admin));

            return admin;
        });
}

function logout() {
    // remove admin from local storage to log admin out
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/admins`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/admins/${id}`, requestOptions).then(handleResponse);
}

function register(admin) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
    };

    return fetch(`${config.apiUrl}/admins/register`, requestOptions).then(handleResponse);
}

function update(admin) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
    };

    return fetch(`${config.apiUrl}/admins/${admin.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/admins/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

// Dueker - Developed by Sanyam Jain