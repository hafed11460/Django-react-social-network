import axios from 'axios'
import { BASE_URL } from './baseUrl'

export const axiosBaseQuery =
  (
    { baseUrl }= { baseUrl: '' }
  ) =>
  async ({ url, method, data }) => {
    try {
      let header = {}
      if(localStorage.getItem("access")){
        header = {
            baseURL:BASE_URL,
            headers:{
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem('access'))}`,
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
     }else{
        header = {
            baseURL:BASE_URL,
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
    }
      const api = axios.create(header)
      const result = await api({ url: baseUrl + url, method, data })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }
