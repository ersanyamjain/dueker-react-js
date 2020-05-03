import { dueConstants } from '../_constants';

export function dues(state = {}, action) {
  switch (action.type) {
    case dueConstants.DUE_GETALL_REQUEST:
      return {
        loading: true
      };
    case dueConstants.DUE_GETALL_SUCCESS:
      return {
        items: action.dues
      };
    case dueConstants.DUE_GETALL_FAILURE:
      return {
        error: action.error
      };
    case dueConstants.DUE_CLEAR_REQUEST:
      // add 'deleting:true' property to due being deleted
      return {
        ...state,
        items: state.items.map(due =>
          due.id === action.id
            ? { ...due, clearing: true }
            : due
        )
      };
    case dueConstants.DUE_CLEAR_SUCCESS:
      // send updated dues from state
      return {
        items: state.items
      };
    case dueConstants.DUE_CLEAR_FAILURE:
      // remove 'clearing:true' property and add 'clearError:[error]' property to due 
      return {
        ...state,
        items: state.items.map(due => {
          if (due.id === action.due.id) {
            // make copy of due without 'clearing:true' property
            const { clearing, ...dueCopy } = due;
            // return copy of due with 'clearError:[error]' property
            return { ...dueCopy, clearError: action.error };
          }
          return due;
        })
      };
    case dueConstants.DUE_DELETE_REQUEST:
      // add 'deleting:true' property to due being deleted
      return {
        ...state,
        items: state.items.map(due =>
          due.id === action.id
            ? { ...due, deleting: true }
            : due
        )
      };
    case dueConstants.DUE_DELETE_SUCCESS:
      // remove deleted due from state
      return {
        items: state.items.filter(due => due.id !== action.id)
      };
    case dueConstants.DUE_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to due 
      return {
        ...state,
        items: state.items.map(due => {
          if (due.id === action.id) {
            // make copy of due without 'deleting:true' property
            const { deleting, ...dueCopy } = due;
            // return copy of due with 'deleteError:[error]' property
            return { ...dueCopy, deleteError: action.error };
          }

          return due;
        })
      };
    default:
      return state
  }
}

// Dueker - Developed by Sanyam Jain