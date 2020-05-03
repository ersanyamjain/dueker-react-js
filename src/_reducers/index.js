import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { adminRegistration } from './admin.registration.reducer';
import { userRegistration } from './user.registration.reducer';
import { studentRegistration } from './student.registration.reducer';
import { dueAdd } from './due.add.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { students } from './students.reducer';
import { dues } from './dues.reducer';
import { adminAuthentication } from './admin.authentication.reducer';
import { admins } from './admins.reducer';

const rootReducer = combineReducers({
  authentication,
  userRegistration,
  studentRegistration,
  dueAdd,
  users,
  students,
  dues,
  alert,
  admins,
  adminAuthentication,
  adminRegistration
});

export default rootReducer;

// Dueker - Developed by Sanyam Jain