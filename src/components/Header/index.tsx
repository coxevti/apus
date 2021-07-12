import { useAuth } from 'context/AuthContext'
import React from 'react'

import { LogOut } from 'react-feather'
import { Container, Content, Profile, Separation } from './styles'

const Header: React.FC = () => {
    const { signOut, user } = useAuth()

    return (
        <Container>
            <Content>
                <h1>Apus</h1>
                <aside>
                    <Profile>
                        <img
                            src={`${user.avatar}`}
                            alt={`Foto do perfil ${user.name}`}
                        />
                        <strong>{user.name}</strong>
                    </Profile>
                    <Separation />
                    <button type="button" onClick={signOut}>
                        <LogOut />
                    </button>
                </aside>
            </Content>
        </Container>
    )
}

export default Header
