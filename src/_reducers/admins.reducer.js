import { adminConstants } from '../_constants';

export function admins(state = {}, action) {
  switch (action.type) {
    case adminConstants.ADMIN_GETALL_REQUEST:
      return {
        loading: true
      };
    case adminConstants.ADMIN_GETALL_SUCCESS:
      return {
        items: action.admins
      };
    case adminConstants.ADMIN_GETALL_FAILURE:
      return {
        error: action.error
      };
    case adminConstants.ADMIN_DELETE_REQUEST:
      // add 'deleting:true' property to admin being deleted
      return {
        ...state,
        items: state.items.map(admin =>
          admin.id === action.id
            ? { ...admin, deleting: true }
            : admin
        )
      };
    case adminConstants.ADMIN_DELETE_SUCCESS:
      // remove deleted admin from state
      return {
        items: state.items.filter(admin => admin.id !== action.id)
      };
    case adminConstants.ADMIN_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to admin 
      return {
        ...state,
        items: state.items.map(admin => {
          if (admin.id === action.id) {
            // make copy of admin without 'deleting:true' property
            const { deleting, ...adminCopy } = admin;
            // return copy of admin with 'deleteError:[error]' property
            return { ...adminCopy, deleteError: action.error };
          }

          return admin;
        })
      };
    default:
      return state
  }
}

// Dueker - Developed by Sanyam Jain