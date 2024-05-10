import { useState } from "react";

export default function AddTodo({ addTodo }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  async function createTodo() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://restapi.fr/api/tagt_todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          content: value,
          edit: false,
          done: false,
        }),
      });

      if (response.ok) {
        const todo = await response.json();
        addTodo(todo);
      } else {
        setError("Une erreur est survenue");
      }
    } catch (e) {
      setError("Une erreur est survenue");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      createTodo();
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      createTodo();
      setValue("");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mb-20">
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
        className="btn btn-primary">
        {loading ? "Chargement" : "Ajouter"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

