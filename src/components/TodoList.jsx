import React, { useContext, useEffect, useState } from 'react';
import TodoContext from '../context/TodoContext';
import Todo from './Todo';
import '../../public/styles/todo.css'
import { v4 as uuidv4 } from 'uuid';

const TodoList=()=>{
    const[task,setTask]=useState('');
    const {todo,setTodo}=useContext(TodoContext);
    const [editingId,setEditingId]=useState(null);
    useEffect(()=>{
        const storedTodos=localStorage.getItem('todos')
        if(storedTodos){
            try{
                const parsedTodos=JSON.parse(storedTodos);
                setTodo(parsedTodos)
            }catch(e){
                console.log('Error catching stored Todos',e);
                
            }
        }
    },[setTodo]);
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(task.trim()==='') return;
        let updatedTodo;
            const newTask={
                id:uuidv4(),
                task:task,
                isCompleted:false
            }
            updatedTodo=[newTask,...todo]
        setTodo(updatedTodo)
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
        // setEditingId(null)
        setTask('')
    }
    const handleDelete=(id)=>{
        const updatedTodo=todo.filter((item)=>item.id!==id)
        setTodo(updatedTodo);
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }
    const handleComplete=(id)=>{
        const updatedTodo=todo.map(item=>item.id===id?{...item,isCompleted:!item.isCompleted}:item)
        setTodo(updatedTodo)
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }
    const handleEdit=(id,editedTask)=>{
        console.log('Editing task:',task);
        const updatedTodo = todo.map((item) =>
            item.id === id ? { ...item, task:editedTask } : item
        );
        setTodo(updatedTodo);
        localStorage.setItem('todos', JSON.stringify(updatedTodo));
    }
    return(
        <>
            <h1>Todo List</h1>
            <div className='container1'>
                <input className="input" type='text' value={task}  onChange={(e)=>setTask(e.target.value)} placeholder='Enter Task'/>
                <button className='button1' onClick={handleSubmit} disabled={task.trim()===''}>Submit</button>
            </div>
            <div>
                <h1>Tasks to do</h1>
                <div>
                    {todo && todo.map((item)=>(
                        <Todo key={item.id} 
                        task={item.task} 
                        id={item.id}
                        isCompleted={item.isCompleted}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onComplete={handleComplete}
                        disabled={item.isCompleted}
                    />
                ))}
                </div>
            </div>
        </>
    )
}
export default TodoList;