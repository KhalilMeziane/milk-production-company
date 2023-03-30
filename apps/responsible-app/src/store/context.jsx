/* eslint-disable react/prop-types */
import React, { createContext, useReducer, useMemo } from 'react'

import useCombinedReducers from 'use-combined-reducers'
import Cookies from 'js-cookie'

import { AuthReducer, CowReducer, MilkReducer } from './reducers/_index'

export const Store = createContext()

const getUserFromCookies = () => {
    try {
        return Cookies.get('auth') !== undefined ? JSON.parse(Cookies.get('auth')) : undefined
    } catch (error) {
        console.log(error)
    }
}

const initialState = {
    auth: getUserFromCookies(),
    cows: [],
    milks: []
}

export function ContextProvider ({ children }) {
    const [state, dispatch] = useCombinedReducers({
        auth: useReducer(AuthReducer, initialState.auth),
        cows: useReducer(CowReducer, initialState.cows),
        milks: useReducer(MilkReducer, initialState.milks)
    })
    const store = useMemo(() => [state, dispatch], [state])

    return <Store.Provider value={store}>{children}</Store.Provider>
}
