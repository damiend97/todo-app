// Needs a refresh after addTodo to be able to remove or update new todo
// because id is generated only when todo object hits the database (automatically)
// fix  - loadTodos() after addTodo? - not working
//      - generate custom ID before database

import './App.css';

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

import { DataStore } from '@aws-amplify/datastore';
import { Todo as AWSTODO } from './models';


Amplify.configure(awsconfig);

function App() {
    // state management -----------------------------------
    const [todos, setTodos] = useState([]);

    const loadTodos = async () => {
        try {
            let dataStoreItems = await DataStore.query(AWSTODO);
            let todos = dataStoreItems.map(todo => {
                return {
                    id: todo.id,
                    text: todo.text,
                    completed: todo.completed
                }
            })

            return todos;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadTodos()
        .then((dbTodos) => setTodos(dbTodos));
    }, [])

    useEffect(() => {
        loadTodos();
    }, [todos])

    // todo functions   -----------------------------------
    const addTodo  = async (todo) => {
        try {
            await DataStore.save(
                new AWSTODO(todo)
            );

            const newTodos = [...todos, todo];
            setTodos(newTodos);
        } catch(e) {
            console.log(e);
        }
    };

    const removeTodo = async (index, id) => {
        try {
            const modelToDelete = await DataStore.query(AWSTODO, id);
            await DataStore.delete(modelToDelete);
            
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            setTodos(newTodos);
        } catch (e) {
            console.log(e);
        }
    }
    
    const completeTodo = async (index, todo) => {
        try {
            const original = await DataStore.query(AWSTODO, todo.id);
            const bool = original.completed;

            await DataStore.save(
                AWSTODO.copyOf(original, updated => {
                    updated.completed = !bool;
                })
            );

            const newTodos = [...todos];
            newTodos[index].completed = !newTodos[index].completed;
            setTodos(newTodos);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="app">
            <div className="todo-list">
                {(todos.length > 0) ?
                    todos.map((todo, index) => (
                        <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} removeTodo={removeTodo} />
                    ))
                 :
                    <div className="empty-message">Nothing to do!</div>
                }
                
            </div>

            <TodoForm addTodo={addTodo} />
        </div>
    );
}

export default App;
