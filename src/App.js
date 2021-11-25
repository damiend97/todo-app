import './App.css';

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import { Auth } from 'aws-amplify';

import { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

import { DataStore } from '@aws-amplify/datastore';
import { Todo as AWSTODO } from './models';



Amplify.configure(awsconfig);


function App() {
    // authentication   -----------------------------------
    const signIn = async () => {
        try {
            const user = await Auth.signIn("todo-admin", "Dhod0563");
            console.log(user);
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    // state management -----------------------------------
    const [todos, setTodos] = useState([
        {
            text: "Create App",
            completed: false
        },
        {
            text: "Take a shot",
            completed: false
        },
        {
            text: "Get realll fukkked up",
            completed: false
        }
    ]);

    // todo functions   -----------------------------------
    const addTodo  = async (todo) => {
        const newTodos = [...todos, todo];
        setTodos(newTodos);

        
        // create
        await DataStore.save(
            new AWSTODO(todo)
        );
        // dont have to use .then with await if i set await to a variable like the delete/query below does
        

        
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
        // dont have to use .then with await if i set await to a variable like the delete/query below does
        */

        /*
        // delete
        // cant figure out how this works but this is the given format
        // is 1234... the index???
        const modelToDelete = await DataStore.query(AWSTODO, 123456789);
        DataStore.delete(modelToDelete);
        */
        

        /*
        // query
        const models = await DataStore.query(AWSTODO);
        console.log(models);
        */
        

    };

    const removeTodo = (index) => {
        console.log(index);
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }
    
    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
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

            <button onClick={signIn}>login</button>
        </div>
    );
}

export default App;
