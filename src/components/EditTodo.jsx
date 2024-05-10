import { useState } from "react";

export default function EditTodo({ todo, updateTodo }) {
  const [value, setValue] = useState(todo.content);

  async function tryUpdateTodo(newTodo) {
    try {
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
    }
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      tryUpdateTodo({ ...todo, content: value, edit: false });
      setValue("");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mb-10">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        className="mr-15 flex-fill"
        placeholder="Ajouter une tâche"
      />
      <button
        onClick={handleClick}
        className="btn btn-primary mr-15">
        Sauvegarder
      </button>
      <button
        onClick={() => tryUpdateTodo({ ...todo, edit: false })}
        className="btn btn-reverse-primary">
        Annuler
      </button>
    </div>
  );
}

