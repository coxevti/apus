import { Container } from 'components/Button/styles'
import React from 'react'
import ButtonProps from './Props'

const Button = ({ children, ...rest }: ButtonProps) => (
    <Container type="button" {...rest}>
        {children}
    </Container>
)

export default Button
