import axios from 'axios'
import setAuthHeader from './set-auth-header'
import { LOGIN, LOGOUT, REFRESH } from './end-pointes'

export const Login = (body) => {
    return axios.post(LOGIN, body)
}

export const Logout = (accessToken) => {
    setAuthHeader(accessToken)
    return axios.get(LOGOUT)
}

export const Refresh = (body) => {
    return axios.post(REFRESH, body)
}
