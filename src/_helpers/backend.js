// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let students = JSON.parse(localStorage.getItem('students')) || [];
let dues = JSON.parse(localStorage.getItem('dues')) || [];
let admins = JSON.parse(localStorage.getItem('admins')) || [
    { username: 'admin', password: 'admin', firstName: 'Administrator', lastName: 'Account' }
];

export function configureBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/admins/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any admin matches login credentials
                    let filteredAdmins = admins.filter(admin => {
                        return admin.username === params.username && admin.password === params.password;
                    });

                    if (filteredAdmins.length) {
                        // if login details are valid return admin details and jwt token
                        let admin = filteredAdmins[0];
                        let responseJson = {
                            id: admin.id,
                            username: admin.username,
                            firstName: admin.firstName,
                            lastName: admin.lastName,
                            token: 'jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get admins
                if (url.endsWith('/admins') && opts.method === 'GET') {
                    // check for auth token in header and return admins if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(admins)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get admin by id
                if (url.match(/\/admins\/\d+$/) && opts.method === 'GET') {
                    // check for auth token in header and return admin if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        // find admin by id in admins array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedAdmins = admins.filter(admin => { return admin.id === id; });
                        let admin = matchedAdmins.length ? matchedAdmins[0] : null;

                        // respond 200 OK with admin
                        resolve({ ok: true, text: () => JSON.stringify(admin) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register admin
                if (url.endsWith('/admins/register') && opts.method === 'POST') {
                    // get new admin object from post body
                    let newAdmin = JSON.parse(opts.body);

                    // validation
                    let duplicateAdmin = admins.filter(admin => { return admin.username === newAdmin.username; }).length;
                    if (duplicateAdmin) {
                        reject('Username "' + newAdmin.username + '" is already taken');
                        return;
                    }

                    // save new admin
                    newAdmin.id = admins.length ? Math.max(...admins.map(admin => admin.id)) + 1 : 1;
                    admins.push(newAdmin);
                    localStorage.setItem('admins', JSON.stringify(admins));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete admin
                if (url.match(/\/admins\/\d+$/) && opts.method === 'DELETE') {
                    // check for auth token in header and return admin if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        // find admin by id in admins array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < admins.length; i++) {
                            let admin = admins[i];
                            if (admin.id === id) {
                                // delete admin
                                admins.splice(i, 1);
                                localStorage.setItem('admins', JSON.stringify(admins));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(user) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    // validation
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        reject('Username "' + newUser.username + '" is already taken');
                        return;
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    // check for auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }


                // get students
                if (url.endsWith('/students') && opts.method === 'GET') {
                    // check for auth token in header and return students if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(students)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get student by id
                if (url.match(/\/students\/\d+$/) && opts.method === 'GET') {
                    // check for auth token in header and return student if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        // find student by id in students array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedStudents = students.filter(student => { return students.id === id; });
                        let student = matchedStudents.length ? matchedStudents[0] : null;

                        // respond 200 OK with student
                        resolve({ ok: true, text: () => JSON.stringify(student) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // register student
                if (url.endsWith('/students/register') && opts.method === 'POST') {
                    // get new student object from post body
                    let newStudent = JSON.parse(opts.body);

                    // validation
                    let duplicateStudent = students.filter(student => { return student.studentId === newStudent.studentId; }).length;
                    if (duplicateStudent) {
                        reject('Student ID "' + newStudent.studentId + '" is already registered');
                        return;
                    }

                    // save new student
                    newStudent.id = students.length ? Math.max(...students.map(student => student.id)) + 1 : 1;
                    students.push(newStudent);
                    localStorage.setItem('students', JSON.stringify(students));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete student
                if (url.match(/\/students\/\d+$/) && opts.method === 'DELETE') {
                    // check for auth token in header and return student if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        // find student by id in students array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < students.length; i++) {
                            let student = students[i];
                            if (student.id === id) {
                                // delete student
                                students.splice(i, 1);
                                localStorage.setItem('students', JSON.stringify(students));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get dues
                if (url.endsWith('/dues') && opts.method === 'GET') {
                    // check for auth token in header and return dues if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(dues)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get due by id
                if (url.match(/\/dues\/\d+$/) && opts.method === 'GET') {
                    // check for auth token in header and return due if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        // find due by id in dues array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedDues = dues.filter(due => { return dues.id === id; });
                        let due = matchedDues.length ? matchedDues[0] : null;

                        // respond 200 OK with due
                        resolve({ ok: true, text: () => JSON.stringify(due) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // add due
                if (url.endsWith('/dues/add') && opts.method === 'POST') {
                    // get new due object from post body
                    let newDue = JSON.parse(opts.body);

                    // validation
                    let studentRecord = students.filter(student => { return student.studentId === newDue.studentId; }).length;
                    if (studentRecord < 1) {
                        reject('Student ID "' + newDue.studentId + '" does not exist');
                        return;
                    }

                    // save new due
                    newDue.id = dues.length ? Math.max(...dues.map(due => due.id)) + 1 : 1;
                    dues.push(newDue);
                    localStorage.setItem('dues', JSON.stringify(dues));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete due
                if (url.match(/\/dues\/\d+$/) && opts.method === 'DELETE') {
                    // check for auth token in header and return due if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer jwt-token') {
                        // find due by id in dues array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < dues.length; i++) {
                            let due = dues[i];
                            if (due.id === id) {``
                                // delete due
                                dues.splice(i, 1);
                                localStorage.setItem('dues', JSON.stringify(dues));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // update due
                if (url.match(/\/dues\/\d+$/) && opts.method === 'PUT') {
                    // find due by id in dues array
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    // get new due object from post body
                    let newDue = JSON.parse(opts.body);

                    for (let i = 0; i < dues.length; i++) {
                        if (id === dues[i].id) {
                            dues[i] = newDue
                        }
                    }

                    localStorage.setItem('dues', JSON.stringify(dues));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}

// Dueker - Developed by Sanyam Jain