import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
    baseURL: '',
    timeout: 3000,
    timeoutErrorMessage:'请求超时',
    withCredentials:true
})

instance.interceptors.request.use(
    (config)=>{
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response)=>{
        const data = response.data

        if(data.conde === '40001') {
            window.location.href = '/login'
        } else if(data.code !==  '200') {
            message.error(data.message)
        }

        return data.data
    },
    (error) =>{
        return Promise.reject(error)
    }
)
export default {
    get: (url: string, params?: object)=>{
        return instance.get(url,{...params})
    },
    post: (url: string, params?: object)=>{
        return instance.post(url,{...params})
    },
    put: (url: string, params?: object)=>{
        return instance.put(url,{...params})
    },
    delete: (url: string, params?: object)=>{
        return instance.delete(url,{...params})
    }
}