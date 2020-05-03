import { dueConstants } from '../_constants';

export function dueAdd(state = {}, action) {
  switch (action.type) {
    case dueConstants.DUE_ADD_REQUEST:
      return { registering: true };
    case dueConstants.DUE_ADD_SUCCESS:
      return {};
    case dueConstants.DUE_ADD_FAILURE:
      return {};
    default:
      return state
  }
}

// Dueker - Developed by Sanyam Jain