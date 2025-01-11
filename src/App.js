import './App.css';
import { FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { createToDo, deleteToDoById, getToDoList } from './api';
import { notify } from './utils';

function App() {
  const [toDoItem, setToDoItem] = useState("")
  const [toDoList, setToDoList] = useState([])

  const fetchToDoList = async () => {
    try {
      const resData = await getToDoList();
      setToDoList(resData.fetchAllTasks)
    } catch (error) {
      console.log("error fetching to do list", error)
      notify("error", "Failed to Fetch Tasks")
    }
  }

  useEffect(() => {
    fetchToDoList()
  }, [])

  const handleDeleteTask = async (id) => {
    try {
      const resData = await deleteToDoById(id)
      if (resData) {
        notify("success", resData.message)
        fetchToDoList()
      } else {
        notify("Failed to Delete Task")
      }
    } catch (error) {
      console.log("error deleting task", error)
      notify("error", "Failed to Delete Task")
    }
  }

  const handleAddToDo = async () => {
    const taskObj = {
      taskName: toDoItem
    }
    try {
      const resData = await createToDo(taskObj)
      if (resData) {
        notify("success", resData.message)
        fetchToDoList()
      } else {
        notify("error creating to do")
      }
    } catch (error) {
      console.log("error creating to do", error)
      notify("error", "error creating to do")
    }
  }

  return (
    <div className="App">
      <div className='w-50 m-auto mt-4 mb-4'>
        <h1 className='mt-4 mb-4'>Task Manager App</h1>
        <div className='d-flex'>

          {/* Create To Do Form */}
          <div className='d-flex me-2 w-100'>
            <input type='text' placeholder='Add a new Task' className='form-control me-1' onChange={(e) => setToDoItem(e.target.value)} />
            <button className='btn btn-success'>
              <FaPlus onClick={handleAddToDo} />
            </button>
          </div>

          {/* Search To Do*/}
          <div className='d-flex w-100'>
            <span className='input-group-text'>
              <FaSearch />
            </span>
            <input type="text" className='form-control' />
          </div>

        </div>

        {/* List To Do*/}
        <div className='mt-4'>
          {
            toDoList.map((item, index) => {
              return (
                <>
                  <div key={item._id} className='d-flex align-items-center justify-content-between border bg-light w-100 rounded-3 p-2 mt-2'>
                    <span className='text-decoration-line-through'>{item.taskName}</span>
                    <div>
                      <button className='btn btn-primary btn-small me-2'><FaPencilAlt /></button>
                      <button className='btn btn-danger btn-small' onClick={() => handleDeleteTask(item._id)}><FaTrash /></button>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>


        {/* Toastify */}
        <ToastContainer
          position='top-right'
          autoClose={3000}
        />

      </div>
    </div>
  );
}

export default App;
