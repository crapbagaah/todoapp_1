import { useEffect, useState } from 'react'
import Styles from './TODO.module.css'
//import { dummy } from './dummy'
import axios from 'axios'

export function TODO(props) {

    const [newTodo, setNewTodo] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [todoData, setTodoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodo = async () => {
            const apiData = await getTodo()
            setTodoData(apiData);
            setLoading(false)
        }
        fetchTodo();

        /*const fetchTodoDesc=async()=>{
            const apiDesc= await getTodo()
            setNewDescription(apiDesc);
            setLoading(false)
        }
        fetchTodoDesc();*/
    }, [])

    const getTodo = async () => {
        const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo`,
            headers: {
                accept: "application/json"
            }
        }
        try {
            const response = await axios.request(options)
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const addTodo = () => {
        const options = {
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo`,
            headers: {
                accept: "application/json"
            },
            data: {
                title: newTodo,
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData(prevData => [...prevData, response.data]);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteTodo = (id) => {
        const options = {
            method: "DELETE",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo/${id}`,
            headers: {
                accept: "application/json"
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData(prevData => prevData.filter(todo => todo._id !== id))
            })
            .catch(error => {
                console.log(error)
            })
    };

    const updateTodo = (id) => {
        const todoToUpdate = todoData.find(todo => todo._id === id)
        const options = {
            method: "PATCH",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo/${id}`,
            headers: {
                accept: "application/json"
            },
            data: {
                ...todoToUpdate,
                done: !todoToUpdate.done
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData (prevData => prevData.map(todo => todo._id === id ? response.data : todo))
            })
            .catch(error => {
                console.log(error)
            })
    };

    const editTodo = (id) => {
        const todoToEdit = todoData.find(todo => todo._id === id)
        const newTitle=prompt("Enter title", todoToEdit.title)
        const newDescription=prompt("Enter description", todoToEdit.description)
        const options = {
            method: "PATCH",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo/${id}`,
            headers: {
                accept: "application/json"
            },
            data: {
                ...todoToEdit,
                title: newTitle,
                description: newDescription
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData (prevData => prevData.map(todo => todo._id === id ? response.data : todo));
                setNewDescription('');
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className={Styles.ancestorContainer}>
            <div className={Styles.headerContainer}>
                <h1>
                    Tasks
                </h1>
                <span>
                    <input
                        className={Styles.todoInput}
                        type='text'
                        name='New Todo'
                        value={newTodo}
                        onChange={(event) => {
                            setNewTodo(event.target.value)
                        }}
                    />
                    <button
                        id='addButton'
                        name='add'
                        className={Styles.addButton}
                        onClick={() => {
                            addTodo()
                            setNewTodo('')
                        }}
                    >
                        + New Todo
                    </button>
                </span>
            </div>
            <div id='todoContainer' className={Styles.todoContainer}>
                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : (
                    todoData.length > 0 ? (
                        todoData.map((entry, index) => (
                            <div key={entry._id} className={Styles.todo}>
                                <span className={Styles.infoContainer}>
                                    <input
                                        type='checkbox'
                                        checked={entry.done}
                                        onChange={() => {
                                            updateTodo(entry._id);
                                        }}
                                    />
                                    <span style={{ fontSize: '1em', marginBottom: '2px', width: '100%' }}>
                                        {entry.title}
                                    </span>
                                    <div style={{ fontSize: '0.8em', marginLeft:'32px', color: '#555', width: '100%' }}>
                                        {entry.description}
                                    </div>

                                    
                                </span>
                                <span
                                style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        editTodo(entry._id);
                                    }}
                                >
                                    Edit
                                </span>
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        deleteTodo(entry._id);
                                    }}
                                >
                                    Delete
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className={Styles.noTodoMessage}>No tasks available. Please add a new task.</p>
                    )
                )}
            </div>
        </div>
    )
}


//---------------------------------------- ORIGINAL CODE --------------------------------------------------------------
/*import { useEffect, useState } from 'react'
import Styles from './TODO.module.css'
//import { dummy } from './dummy'
import axios from 'axios'

export function TODO(props) {

    const [newTodo, setNewTodo] = useState('')
    const [todoData, setTodoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodo = async () => {
            const apiData = await getTodo()
            setTodoData(apiData);
            setLoading(false)
        }
        fetchTodo();
    }, [])

    const getTodo = async () => {
        const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo`,
            headers: {
                accept: "application/json"
            }
        }
        try {
            const response = await axios.request(options)
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const addTodo = () => {
        const options = {
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo`,
            headers: {
                accept: "application/json"
            },
            data: {
                title: newTodo,
                description: newDescription
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData(prevData => [...prevData, response.data])
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteTodo = (id) => {
        const options = {
            method: "DELETE",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo/${id}`,
            headers: {
                accept: "application/json"
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData(prevData => prevData.filter(todo => todo._id !== id))
            })
            .catch(error => {
                console.log(error)
            })
    };

    const updateTodo = (id) => {
        const todoToUpdate = todoData.find(todo => todo._id === id)
        const options = {
            method: "PATCH",
            url: `${process.env.REACT_APP_SERVER_URL}/api/todo/${id}`,
            headers: {
                accept: "application/json"
            },
            data: {
                ...todoToUpdate,
                done: !todoToUpdate.done
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData (prevData => prevData.map(todo => todo._id === id ? response.data : todo))
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className={Styles.ancestorContainer}>
            <div className={Styles.headerContainer}>
                <h1>
                    Tasks
                </h1>
                <span>
                    <input
                        className={Styles.todoInput}
                        type='text'
                        name='New Todo'
                        value={newTodo}
                        onChange={(event) => {
                            setNewTodo(event.target.value)
                        }}
                    />
                    <button
                        id='addButton'
                        name='add'
                        className={Styles.addButton}
                        onClick={() => {
                            addTodo()
                            setNewTodo('')
                        }}
                    >
                        + New Todo
                    </button>
                </span>
            </div>
            <div id='todoContainer' className={Styles.todoContainer}>
                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : (
                    todoData.length > 0 ? (
                        todoData.map((entry, index) => (
                            <div key={entry._id} className={Styles.todo}>
                                <span className={Styles.infoContainer}>
                                    <input
                                        type='checkbox'
                                        checked={entry.done}
                                        onChange={() => {
                                            updateTodo(entry._id);
                                        }}
                                    />
                                    {entry.title}
                                    
                                </span>
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        deleteTodo(entry._id);
                                    }}
                                >
                                    Delete
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className={Styles.noTodoMessage}>No tasks available. Please add a new task.</p>
                    )
                )}
            </div>
        </div>
    )
}*/