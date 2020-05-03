import { adminConstants } from '../_constants';

let admin = JSON.parse(localStorage.getItem('admin'));
const initialState = admin ? { loggedIn: true, admin } : {};

export function adminAuthentication(state = initialState, action) {
  switch (action.type) {
    case adminConstants.ADMIN_LOGIN_REQUEST:
      return {
        loggingIn: true,
        admin: action.admin
      };
    case adminConstants.ADMIN_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        admin: action.admin
      };
    case adminConstants.ADMIN_LOGIN_FAILURE:
      return {};
    case adminConstants.ADMIN_LOGOUT:
      return {};
    default:
      return state
  }
}

// Dueker - Developed by Sanyam Jain