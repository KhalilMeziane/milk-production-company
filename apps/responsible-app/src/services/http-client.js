import axios from 'axios'
import setAuthHeader from './set-auth-header'
import { LOGIN, LOGOUT, REFRESH, COWS, MILKS } from './end-pointes'

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

export const GetCows = (accessToken) => {
    setAuthHeader(accessToken)
    return axios.get(COWS)
}

export const CreateCow = (accessToken, body) => {
    setAuthHeader(accessToken)
    return axios.post(COWS, body)
}

export const DeleteCow = (accessToken, id) => {
    setAuthHeader(accessToken)
    return axios.delete(`${COWS}/${id}`)
}

export const UpdateCow = (accessToken, id, body) => {
    setAuthHeader(accessToken)
    return axios.patch(`${COWS}/${id}`, body)
}

export const GetMilks = (accessToken) => {
    setAuthHeader(accessToken)
    return axios.get(MILKS)
}

export const CreateMilk = (accessToken, body) => {
    setAuthHeader(accessToken)
    return axios.post(MILKS, body)
}

export const DeleteMilk = (accessToken, id) => {
    setAuthHeader(accessToken)
    return axios.delete(`${MILKS}/${id}`)
}

export const UpdateMilk = (accessToken, id, body) => {
    setAuthHeader(accessToken)
    return axios.patch(`${MILKS}/${id}`, body)
}
