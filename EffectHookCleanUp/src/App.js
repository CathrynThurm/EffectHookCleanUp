import React, { useEffect, useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);

  // Load data from https://jsonplaceholder.typicode.com/todos?userId=3
  useEffect(() => {
  const abortController = new AbortController()
      
    const url = "https://jsonplaceholder.typicode.com/todos?userId=3"
  async function loadList() {
    try {
      const response = await fetch(url, { signal: abortController.signal })
      const listFromAPI = await response.json();
      setToDos(listFromAPI);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted", toDos);
      } else {
        throw error;
      }
    }
  }
  loadList();
    
    return () => {
      console.log("Cleaned up", toDos)
    abortController.abort();
  };
}, [toDos]);
  

  return (
    <div className="App">
      <h1>To Do List</h1>
      <ul className="todo-list">
        {toDos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "",
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
