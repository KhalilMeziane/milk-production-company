import axios from 'axios'
import setAuthHeader from './set-auth-header'
import { LOGIN, LOGOUT, REFRESH, COWS, MILKS, RESPONSIBLE, EXAMINATION, PROFILE } from './end-pointes'

// AUTH Calls
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

// COWS Calls
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

// MILKS Calls
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

// RESPONSIBLE Calls
export const CreateResponsible = (accessToken, body) => {
    setAuthHeader(accessToken)
    return axios.post(RESPONSIBLE, body)
}

export const GetResponsibles = (accessToken) => {
    setAuthHeader(accessToken)
    return axios.get(RESPONSIBLE)
}

export const DeleteResponsible = (accessToken, id) => {
    setAuthHeader(accessToken)
    return axios.delete(`${RESPONSIBLE}/${id}`)
}

// EXAMINATION Calls
export const GetExamination = (accessToken, id) => {
    setAuthHeader(accessToken)
    return axios.get(`${EXAMINATION}/${id}`)
}

export const CreateExamination = (accessToken, body) => {
    setAuthHeader(accessToken)
    return axios.post(EXAMINATION, body)
}

export const DeleteExamination = (accessToken, id) => {
    setAuthHeader(accessToken)
    return axios.delete(`${EXAMINATION}/${id}`)
}

export const UpdateExamination = (accessToken, id, body) => {
    setAuthHeader(accessToken)
    return axios.patch(`${EXAMINATION}/${id}`, body)
}

// PROFILE Calls
export const GetInfo = (accessToken) => {
    setAuthHeader(accessToken)
    return axios.get(PROFILE)
}

export const UpdateInfo = (accessToken, body) => {
    setAuthHeader(accessToken)
    return axios.patch(PROFILE, body)
}

export const UpdatePassword = (accessToken, body) => {
    setAuthHeader(accessToken)
    return axios.patch(`${PROFILE}/password`, body)
}
