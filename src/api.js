import { API_BASE_URL } from './utils/index';

export const createToDo = async (taskObj) => {
    const url = `${API_BASE_URL}/addTask`
    const options ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log("error creating to do", error)
    }
}


export const getToDoList = async () => {
    const url = `${API_BASE_URL}/listTask`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.log("error fetching to do list", error)
    }
}

export const deleteToDoById = async (id) => {
    const url = `${API_BASE_URL}/deleteTask/${id}`
    const options ={
        method: 'DELETE'
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        console.log("error fetching to do list", error)
    }
}