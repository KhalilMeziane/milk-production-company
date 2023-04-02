import React, { useContext, Suspense, lazy } from 'react'

import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'

import { Store } from '@store/context'
import { Flex, Text } from '@chakra-ui/react'

const Login = lazy(() => import('@pages/login/page'))
const Cows = lazy(() => import('@pages/cows/page'))
const Users = lazy(() => import('@pages/responsible/page'))
const Milk = lazy(() => import('@pages/milk/page'))
const NotFound = lazy(() => import('@pages/notFound/page'))

const routes = createBrowserRouter([
    {
        element: (<Suspense fallback={<Loading />}>
            <PublicRoute />
        </Suspense>),
        children: [
            {
                path: '/',
                element: <Login />
            }
        ]
    },
    {
        element: (<Suspense fallback={<Loading />}>
            <ProtectedRoute />
        </Suspense>),
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
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default function Navigation () {
    return (
        <RouterProvider router={routes} />
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
    if (auth?.role !== 'admin') {
        return <Navigate to='/404' />
    }
    return <Outlet />
}

function Loading () {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'gray.50'}
        >
            <Text fontSize={'3xl'}>Loading...</Text>
        </Flex>
    )
}
