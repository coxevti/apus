import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import cogoToast from 'cogo-toast'
import Button from 'components/Button'
import Input from 'components/Input'
import { useAuth } from 'context/AuthContext'
import { useLocation } from 'react-router-dom'
import {
    Background,
    Container,
    Content,
    AnimationContainer
} from 'pages/SignIn/styles'
import React, { useCallback, useEffect, useRef } from 'react'
import { Lock, Mail } from 'react-feather'

import getValidationErrors from 'utils/getValidationErrors'
import * as Yup from 'yup'
import { ParamsFormData } from './ParamsFormData'
import { useState } from 'react'
import Loading from 'components/Loading'

const SignIn: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const { signIn } = useAuth()

    const handleSubmit = useCallback(
        async (data: ParamsFormData) => {
            setLoading(true)
            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .email('Digite um e-mail válido')
                        .required('E-mail obrigatório'),
                    password: Yup.string()
                        .min(4, 'Senha deve ter pelo menos 4 caracteres')
                        .required('Senha obrigatória')
                })
                await schema.validate(data, { abortEarly: false })
                await signIn({ email: data.email, password: data.password })
                return () => {
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error)
                    formRef.current?.setErrors(errors)
                    error.errors.forEach((err: string) => {
                        cogoToast.error(err, { hideAfter: 5 })
                    })
                } else {
                    cogoToast.error(error.response.data.message, {
                        hideAfter: 5
                    })
                }
            }
        },
        [signIn, setLoading]
    )

    const { search } = useLocation()

    useEffect(() => {
        ;(() => {
            const query = new URLSearchParams(search)
            if (query.has('expired_session')) {
                cogoToast.error('Sua sessão expirou, Faça login novamente')
            }
        })()
    }, [search])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <h1>Apus</h1>
                    <h2>Gestão de Clientes</h2>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            text="E-mail"
                            icon={Mail}
                            autoFocus
                        />
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Senha"
                            text="Senha"
                            icon={Lock}
                        />
                        <Button type="submit" width="100%">
                            {loading ? <Loading /> : 'Entrar'}
                        </Button>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}

export default SignIn
