export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    let admin = JSON.parse(localStorage.getItem('admin'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else if (admin && admin.token) {
        return { 'Authorization': 'Bearer ' + admin.token };
    } else {
        return {};
    }
}

// Dueker - Developed by Sanyam Jain