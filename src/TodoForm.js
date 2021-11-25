import { useState } from 'react';

function TodoForm({ addTodo }) {
    // state management -----------------------------------
    const [newTodo, setNewTodo] = useState('');

    // DOM functions    -----------------------------------
    const handleInput = e => {
        setNewTodo(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(!newTodo) {
            alert("Must have a title!");
            return;
        };

        addTodo({
            text: newTodo,
            completed: false
        })

        setNewTodo('');
    }

    return (
        <div className="todo-form">
            <form onSubmit={handleSubmit}>
                <input className="todo-input" type="text" value={newTodo} placeholder="Add Todo" onChange={handleInput} />
            </form>
        </div>
    )
}

export default TodoForm;