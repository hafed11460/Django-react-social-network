import axios from "axios";
import { BASE_URL } from "./baseUrl";



const headers = () => {

    const token = JSON.parse(localStorage.getItem('access'))
    let header = null
    if (token) {
        header = {
            baseURL:BASE_URL,
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }
    } else {
        header = {
            baseURL:BASE_URL,
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
    }
    return header
}

export default  axios.create(headers())