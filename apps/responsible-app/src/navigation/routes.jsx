import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from '@pages/login/page'
import Cows from '@pages/cows/page'
import Users from '@pages/users/page'
import Milk from '@pages/milk/page'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/cows',
        element: <Cows />
    },
    {
        path: '/users',
        element: <Users />
    },
    {
        path: '/milk',
        element: <Milk />
    }
])

export default function Navigation () {
    return (
        <RouterProvider router={routes}/>
    )
}
