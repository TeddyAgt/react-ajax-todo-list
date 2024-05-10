import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  const [todoList, setTodoList] = useState([]);
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
              setTodoList(todos);
            } else {
              setTodoList([todos]);
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
    setTodoList([...todoList, newTodo]);
  }

  function deleteTodo(todoToDelete) {
    setTodoList(todoList.filter((todo) => todo._id !== todoToDelete._id));
  }

  function updateTodo(updatedTodo) {
    setTodoList(
      todoList.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
    );
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
            todoList={todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;

