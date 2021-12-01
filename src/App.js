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
        let dataStoreItems = await DataStore.query(AWSTODO);
        let todos = dataStoreItems.map(todo => {
            return {
                text: todo.text,
                completed: todo.completed
            }
        })
        console.log("DS ITEMS: ", dataStoreItems);
        console.log(todos);
        return todos;
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
            const newTodos = [...todos, todo];
            setTodos(newTodos);
    
            await DataStore.save(
                new AWSTODO(todo)
            );
        } catch(e) {
            console.log(e);
        }
    };

    const removeTodo = async (index) => {
        try {
            const modelToDelete = await DataStore.query(AWSTODO); //, parameters ********* add index to AWSTODO schema for query params
            DataStore.delete(modelToDelete);
            
            console.log(index);
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            setTodos(newTodos);
        } catch (e) {
            console.log(e);
        }
    }
    
    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
        
        /*
        // update
        // Models in DataStore are immutable. To update a record you must use the copyOf function to apply updates to the item’s fields rather than mutating the instance directly
        let CURRENT_ITEM = new AWSTODO({
            "name": "Lorem ipsum dolor sit amet",
            "description": "Lorem ipsum dolor sit amet"
        })

        await DataStore.save(AWSTODO.copyOf(CURRENT_ITEM, item => {
            // Update the values on {item} variable to update DataStore entry
            new AWSTODO({
                "name": "Lorem ipsum dolor sit amet",
                "description": "Lorem ipsum dolor sit amet"
            })
        })).then(res => console.log(res));
        */
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
