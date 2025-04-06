import React, { useState } from 'react';
import '../../public/styles/todo.css'
const Todo = ({ id, task, isCompleted, onDelete, onEdit, onComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const handleEditToggle = () => {
        if (isEditing){
            onEdit(id, editedTask);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="container">
            <button
                className="button"
                onClick={() => onComplete(id)}
                title="Mark as Complete"
                disabled={isCompleted || isEditing}
            >
                {isCompleted ? '✔️' : '⬜'}
            </button>

            {isEditing ? (
                <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className="input"
                    disabled={isCompleted}
                />
            ) : (
                <span className={`text ${isCompleted ? 'completed' : ''}`}>
                    {task}
                </span>
            )}

            <button
                className="button"
                onClick={handleEditToggle}
                title={isEditing ? 'Save' : 'Edit'}
                disabled={isCompleted}

            >
                {isEditing ? '✅' : '✏️'}
            </button>

            <button
                className="button"
                onClick={() => onDelete(id)}
                title="Delete"
                disabled={isEditing}
            >
                🗑️
            </button>
        </div>
    );
};

export default Todo;