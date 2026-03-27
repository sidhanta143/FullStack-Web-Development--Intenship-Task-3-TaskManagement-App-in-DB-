import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from "./api";
import { notify } from './utils';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            console.log('update api call');
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        } else if (updateTask === null && input) {
            console.log('create api call')
            handleAddTask();
            
        }
        setInput('')
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } =
                await CreateTask(obj);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

  
    const fetchAllTasks = async () => {
        try {
            const response = await GetAllTasks();

            const data = response?.data || []; // safe fallback

            setTasks(data);
            setCopyTasks(data);
        } catch (err) {
            console.error(err);
            setTasks([]); // prevent undefined
            notify('Failed to fetch tasks', 'error')
        }
    }

    useEffect(() => {
        fetchAllTasks()
    }, [])

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }

  return (
    <div className='container d-flex justify-content-center mt-5'>
        <div className='card shadow-lg p-4 w-75' style={{ borderRadius: "15px" }}>
            
            <h2 className='text-center mb-4 fw-bold text-primary'>
                Task Manager App
            </h2>

            <div className='row mb-4'>
                <div className='col-md-6 mb-2'>
                    <div className='input-group'>
                        <input
                            type='text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='form-control rounded-pill'
                            placeholder=' Add a new task...'
                        />
                        <button
                            onClick={handleTask}
                            className='btn btn-success ms-2 rounded-pill px-3'
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='input-group'>
                        <span className='input-group-text bg-white border rounded-pill'>
                            <FaSearch />
                        </span>
                        <input
                            onChange={handleSearch}
                            className='form-control rounded-pill'
                            type='text'
                            placeholder=' Search your tasks...'
                        />
                    </div>
                </div>
            </div>

            {/* TASK LIST */}
            <div>
                {
                    tasks?.length > 0 ? (
                        tasks.map((item) => (
                            <div
                                key={item._id}
                                className='d-flex justify-content-between align-items-center p-3 mb-3 shadow-sm'
                                style={{
                                    borderRadius: "12px",
                                    backgroundColor: "#f8f9fa",
                                    transition: "0.3s"
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "500"
                                    }}
                                    className={item.isDone ? 'text-decoration-line-through text-muted' : ''}
                                >
                                    {item.taskName}
                                </span>

                                <div>
                                    <button
                                        onClick={() => handleCheckAndUncheck(item)}
                                        className='btn btn-outline-success btn-sm me-2 rounded-circle'
                                    >
                                        <FaCheck />
                                    </button>

                                    <button
                                        onClick={() => setUpdateTask(item)}
                                        className='btn btn-outline-primary btn-sm me-2 rounded-circle'
                                    >
                                        <FaPencilAlt />
                                    </button>

                                    <button
                                        onClick={() => handleDeleteTask(item._id)}
                                        className='btn btn-outline-danger btn-sm rounded-circle'
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-muted'>No tasks found 😒</p>
                    )
                }
            </div>

            {/* TOAST */}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    </div>
);
}

export default TaskManager;