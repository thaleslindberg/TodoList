import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import { FcTodoList } from 'react-icons/fc';


const LOCAL_STORAGE_KEY = 'todosApp.todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    //amarzena os todos
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
        })
        todoNameRef.current.value = null
    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    return (
        <>
            <h1> TODO List <FcTodoList /></h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoNameRef} type="text" id="input" />
            <button onClick={handleAddTodo} id="addBtn">Add</button>
            <button onClick={handleClearTodos} id="clearBtn">Clear</button>
            <div id="count-todo"> {todos.filter(todo => !todo.complete).length} left to do</div>
        </>
    );
}

export default App;