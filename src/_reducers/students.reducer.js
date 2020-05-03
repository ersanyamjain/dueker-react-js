import { studentConstants } from '../_constants';

export function students(state = {}, action) {
  switch (action.type) {
    case studentConstants.ST_GETALL_REQUEST:
      return {
        loading: true
      };
    case studentConstants.ST_GETALL_SUCCESS:
      return {
        items: action.students
      };
    case studentConstants.ST_GETALL_FAILURE:
      return {
        error: action.error
      };
    case studentConstants.ST_DELETE_REQUEST:
      // add 'deleting:true' property to student being deleted
      return {
        ...state,
        items: state.items.map(student =>
          student.id === action.id
            ? { ...student, deleting: true }
            : student
        )
      };
    case studentConstants.ST_DELETE_SUCCESS:
      // remove deleted student from state
      return {
        items: state.items.filter(student => student.id !== action.id)
      };
    case studentConstants.ST_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to student 
      return {
        ...state,
        items: state.items.map(student => {
          if (student.id === action.id) {
            // make copy of student without 'deleting:true' property
            const { deleting, ...studentCopy } = student;
            // return copy of student with 'deleteError:[error]' property
            return { ...studentCopy, deleteError: action.error };
          }

          return student;
        })
      };
    default:
      return state
  }
}

// Dueker - Developed by Sanyam Jain