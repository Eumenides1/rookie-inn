import axios from 'axios'
import responsive from "tailwindcss/lib/util/responsive";

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

/**
 * 响应拦截器
 * 服务端返回数据之后，前端响应之前
 */
service.interceptors.response.use(response => {
    const { success, message, data } = response.data
    if (success) {
        return data
    }
    return Promise.reject(new Error(message))
})

export default service