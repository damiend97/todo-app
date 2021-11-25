function Todo({index, todo, completeTodo, removeTodo}) {
    return (
        <div className="todo" key={index}>
            <div style={{textDecoration: todo.completed ? 'line-through': 'none'}}className="todo-text">{todo.text}</div>
            <button className="complete-button" onClick={() => completeTodo(index)}>Complete</button>
            <button className="remove-button" onClick={() => removeTodo(index)}>Remove</button>
        </div>
    )
}

export default Todo;