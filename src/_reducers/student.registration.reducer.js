import { studentConstants } from '../_constants';

export function studentRegistration(state = {}, action) {
  switch (action.type) {
    case studentConstants.ST_REGISTER_REQUEST:
      return { registering: true };
    case studentConstants.ST_REGISTER_SUCCESS:
      return {};
    case studentConstants.ST_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

// Dueker - Developed by Sanyam Jain