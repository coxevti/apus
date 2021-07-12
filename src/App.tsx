import React from 'react'
import { AuthProvider } from 'context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes'
import StylesGlobal from 'styles/global'

const App: React.FC = () => (
    <Router>
        <AuthProvider>
            <Routes />
        </AuthProvider>
        <StylesGlobal />
    </Router>
)

export default App
