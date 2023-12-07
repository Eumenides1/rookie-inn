import axios from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        // 添加icode
        config.headers.icode = import.meta.env.VITE_ICODE
        return config
    }
)

export default service