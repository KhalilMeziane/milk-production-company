import React, { useContext } from 'react'

import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'

import { Store } from '@store/context'

import Login from '@pages/login/page'
import Cows from '@pages/cows/page'
import Users from '@pages//responsible/page'
import Milk from '@pages/milk/page'

const routes = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/',
                element: <Login />
            }
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/cows',
                element: <Cows />
            },
            {
                path: '/milk',
                element: <Milk />
            },
            {
                element: <AdminRoute />,
                children: [
                    {
                        path: '/users',
                        element: <Users />
                    }
                ]
            }
        ]
    }
])

export default function Navigation () {
    return (
        <RouterProvider router={routes}/>
    )
}

function ProtectedRoute () {
    const [state] = useContext(Store)
    const { auth } = state
    if (!auth?.accessToken) {
        return <Navigate to="/" />
    }
    return <Outlet />
}

function PublicRoute () {
    const [state] = useContext(Store)
    const { auth } = state
    if (auth?.accessToken) {
        return <Navigate to="/cows" />
    }
    return <Outlet />
}

function AdminRoute () {
    const [state] = useContext(Store)
    const { auth } = state
    if (auth?.admin !== 'admin') {
        return <Navigate to="/404" />
    }
    return <Outlet />
}
