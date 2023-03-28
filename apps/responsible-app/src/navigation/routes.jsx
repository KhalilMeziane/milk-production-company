import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from '@pages/login/page'
import Cows from '@pages/cows/page'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/cows',
        element: <Cows />
    }
])

export default function Navigation () {
    return (
        <RouterProvider router={routes}/>
    )
}
