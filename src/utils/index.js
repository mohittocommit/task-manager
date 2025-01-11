import { toast } from 'react-toastify';

export const notify = (type, message) => {
    toast[type](message)
}
export const API_BASE_URL = 'https://to-do-app-vwja.vercel.app';