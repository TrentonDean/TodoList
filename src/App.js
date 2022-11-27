import './App.css';
import React, {useState} from "react"

function App() {

  // states for new todo items and for holding all todo items because they are subject to change
  const [newTodo, setNewTodo] = useState("") 
  const [todos, setTodos] = useState([])

  //function for handling new todo 
  const handleNewTodoSubmit = (e) => {
    e.preventDefault()
    if (newTodo.length === 0) { // prevents empty input
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false
    }

    setTodos([...todos, todoItem]) // sets todos to everything that was already in it plus the newTodo
    setNewTodo("")  // clears the newtodo after adding
  }

  //function handling deletion of todo
  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i !== delIdx;
    })
    setTodos(filteredTodos)
  }

  //function toggling complete true or false
  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (index === i) {
        todo.complete = !todo.complete
      }
      return todo;
    })
    setTodos(updatedTodos)
  }

  return (
    <div className="App">

      <h1>Todo List</h1>

      <form onSubmit={(e) => handleNewTodoSubmit(e)}>
        <input onChange={(e) => setNewTodo(e.target.value)} type="text" value={newTodo}></input>
        <div>
          <button style={{marginTop:"10px"}}>Add</button>
        </div>
      </form>

      {/* iterates through the todos list and inserts each item into its own div */}
      {todos.map((todo, i) => {

        const todoClasses = []

        if (todo.complete) {
          todoClasses.push("line-through")
        }

        return(
          <div key={i} style={{margin:"10px"}}>
            <input onChange={(e) => {handleToggleComplete(i)}} checked={todo.complete} type="checkbox"></input>
            <span className={todoClasses.join("")}>{todo.text}</span>
            <button onClick={(e) => {handleTodoDelete(i)}} style={{marginLeft:"10px"}} >Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
