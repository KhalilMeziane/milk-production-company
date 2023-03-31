/* eslint-disable react/prop-types */
import React, { createContext, useReducer, useMemo } from 'react'

import useCombinedReducers from 'use-combined-reducers'

import { AuthReducer, CowReducer, MilkReducer, ResponsibleReducer } from './reducers/_index'

export const Store = createContext()

const initialState = {
    auth: JSON.parse(localStorage.getItem('auth')),
    cows: [],
    milks: [],
    responsibles: []
}

export function ContextProvider ({ children }) {
    const [state, dispatch] = useCombinedReducers({
        auth: useReducer(AuthReducer, initialState.auth),
        cows: useReducer(CowReducer, initialState.cows),
        milks: useReducer(MilkReducer, initialState.milks),
        responsibles: useReducer(ResponsibleReducer, initialState.responsibles)
    })
    const store = useMemo(() => [state, dispatch], [state])

    return <Store.Provider value={store}>{children}</Store.Provider>
}
