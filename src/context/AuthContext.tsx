import React, { createContext, useCallback, useContext, useState } from 'react'
import api from 'services/api'

interface User {
    id: string
    name: string
    email: string
    avatar: string
}

interface AuthState {
    token: string
    user: User
}

interface SignInCredentials {
    email: string
    password: string
}

interface AuthContextData {
    user: User
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Apus:token')
        const user = localStorage.getItem('@Apus:user')
        if (token && user) {
            return {
                token,
                user: JSON.parse(user)
            }
        }
        return {} as AuthState
    })
    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessions', {
            email,
            password
        })
        const { token, user } = response.data
        localStorage.setItem('@Apus:token', token)
        localStorage.setItem('@Apus:user', JSON.stringify(user))
        setData({ token, user })
    }, [])
    const signOut = useCallback(() => {
        localStorage.removeItem('@Apus:token')
        localStorage.removeItem('@Apus:user')
        setData({} as AuthState)
    }, [])

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must ne used within an AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }
