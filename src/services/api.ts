import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000'
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('@Apus:token')
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            }
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        const token = localStorage.getItem('@Apus:token')
        if (err.response.status === 401 && token) {
            localStorage.removeItem('@Apus:token')
            localStorage.removeItem('@Apus:user')
            document.location.href = '/?expired_session'
        }
        return Promise.reject(err)
    }
)

export default api
