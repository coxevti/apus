import { Container } from 'components/Button/styles'
import React from 'react'
import ButtonProps from './Props'

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <Container type="button" {...rest}>
        {children}
    </Container>
)

export default Button
