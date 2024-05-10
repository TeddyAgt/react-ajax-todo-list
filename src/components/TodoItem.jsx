import { useState } from "react";

export default function TodoItem({ todo, deleteTodo, updateTodo }) {
  const [loading, setLoading] = useState(false);

  async function tryUpdateTodo(newTodo) {
    try {
      setLoading(true);
      const { _id, ...newTodoWithoutId } = newTodo;
      const response = await fetch(`https://restapi.fr/api/tagt_todo/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTodoWithoutId),
      });

      if (response.ok) {
        const newTodo = await response.json(response);
        updateTodo(newTodo);
      } else {
        console.log("erreur");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleClickDeleteTodo() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://restapi.fr/api/tagt_todo/${todo._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        deleteTodo(todo);
      } else {
        console.log("erreur");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <li
      className={`mb-10 d-flex flex-row justify-content-center align-items-center p-10 ${
        todo.selected ? "selected" : ""
      }  `}>
      {loading ? (
        <span className="mr-15 flex-fill">Chargement...</span>
      ) : (
        <span className="flex-fill">
          {todo.content} {todo.done && "✅"}
        </span>
      )}

      <button
        className="btn btn-primary mr-15"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, done: !todo.done });
        }}>
        Valider
      </button>
      <button
        className="btn btn-primary mr-15"
        onClick={(e) => {
          e.stopPropagation();
          tryUpdateTodo({ ...todo, edit: !todo.edit });
        }}>
        Modifier
      </button>
      <button
        className="btn btn-reverse-primary"
        onClick={(e) => {
          e.stopPropagation();
          handleClickDeleteTodo();
        }}>
        Supprimer
      </button>
    </li>
  );
}

