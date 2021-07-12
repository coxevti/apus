import React from 'react'

import Header from 'components/Header'
import { Wrapper, Container } from './styles'

const DefaultLayout: React.FC = ({ children }) => (
    <Wrapper>
        <Header />
        <Container>{children}</Container>
    </Wrapper>
)

export default DefaultLayout
