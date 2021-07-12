import { useAuth } from 'context/AuthContext'
import React from 'react'

import {
    Redirect,
    Route as ReactRouterDomRoute,
    RouteProps as ReactRouterDomProps
} from 'react-router-dom'

import DefaultLayout from 'pages/_layouts/default'
import AuthLayout from 'pages/_layouts/auth'

interface RouteProps extends ReactRouterDomProps {
    isPrivate?: boolean
    component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth()
    const Layout = user ? DefaultLayout : AuthLayout
    return (
        <ReactRouterDomRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Layout>
                        <Component />
                    </Layout>
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? '/' : '/dashboard',
                            state: { from: location }
                        }}
                    />
                )
            }}
        />
    )
}

export default Route
