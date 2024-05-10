function todoReducer(state, action) {
  switch (action.type) {
    case "FETCH_TODOS": {
      return {
        ...state,
        todoList: action.todoList,
      };
    }

    case "ADD_TODO": {
      return {
        ...state,
        todoList: [...state.todoList, action.todo],
      };
    }

    case "UPDATE_TODO": {
      return {
        ...state,
        todoList: state.todoList.map((t) =>
          t._id === action.todo._id ? action.todo : t
        ),
      };
    }

    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter((t) => t._id !== action.todo._id),
      };
    }

    default: {
      throw new Error("Action inconnue");
    }
  }
}

export default todoReducer;
