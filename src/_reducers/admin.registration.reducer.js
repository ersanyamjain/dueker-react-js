import { adminConstants } from '../_constants';

export function adminRegistration(state = {}, action) {
  switch (action.type) {
    case adminConstants.ADMIN_REGISTER_REQUEST:
      return { registering: true };
    case adminConstants.ADMIN_REGISTER_SUCCESS:
      return {};
    case adminConstants.ADMIN_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

// Dueker - Developed by Sanyam Jain