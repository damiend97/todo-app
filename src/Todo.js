function Todo({index, todo, completeTodo, removeTodo}) {
    return (
        <div className="todo" key={index}>
            <div style={{textDecoration: todo.completed ? 'line-through': 'none'}}className="todo-text">{todo.text}</div>
            <button className="complete-button" onClick={() => completeTodo(index, todo)}>Complete</button>
            <button className="remove-button" onClick={() => removeTodo(index, todo.id)}>Remove</button>
        </div>
    )
}

export default Todo;