import { useEffect, useContext } from 'react'

import axios from 'axios'
import { Store } from '@store/context'
import { REFRESH } from './end-pointes'

const usePrivateAxios = () => {
    const [state, dispatch] = useContext(Store)
    const { auth } = state
    const refresh = async () => {
        const { data } = await axios.post(REFRESH, auth.refreshToken)
        return data
    }

    useEffect(() => {
        const requestIntercept = axios.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth.accessToken}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const { accessToken, refreshToken } = await refresh()
                    dispatch({ type: 'AUTH_REFRESH', payload: { accessToken, refreshToken } })
                    prevRequest.headers.Authorization = `Bearer ${accessToken}`
                    return axios(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.request.eject(requestIntercept)
            axios.interceptors.response.eject(responseIntercept)
        }
    }, [auth, refresh])

    return axios
}

export default usePrivateAxios
