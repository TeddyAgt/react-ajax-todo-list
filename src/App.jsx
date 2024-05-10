import { useEffect, useReducer, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import todoReducer from "./reducers/todoReducer";

function App() {
  const [state, dispatch] = useReducer(todoReducer, { todoList: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shouldCancel = false;
    async function fetchTodoList() {
      try {
        setLoading(true);
        const response = await fetch("https://restapi.fr/api/tagt_todo");
        if (response.ok) {
          const todos = await response.json();
          if (!shouldCancel) {
            if (Array.isArray(todos)) {
              dispatch({ type: "FETCH_TODOS", todoList: todos });
            } else {
              dispatch({ type: "FETCH_TODOS", todoList: [todos] });
            }
          }
        } else {
          console.log("erreur");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchTodoList();
    return () => {
      shouldCancel = true;
    };
  }, []);

  function addTodo(newTodo) {
    dispatch({ type: "ADD_TODO", todo: newTodo });
  }

  function deleteTodo(todoToDelete) {
    dispatch({ type: "DELETE_TODO", todo: todoToDelete });
  }

  function updateTodo(updatedTodo) {
    dispatch({ type: "UPDATE_TODO", todo: updatedTodo });
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-20">
      <div className="card container p-20">
        <h1 className="mb-20">Liste de tâches</h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <p>Chargement</p>
        ) : (
          <TodoList
            todoList={state.todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;

