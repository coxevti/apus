import { useField } from '@unform/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AlertCircle } from 'react-feather'
import { InputProps } from './Props'
import { Content, Label } from './styles'

const Input: React.FC<InputProps> = ({
    name,
    text,
    id,
    icon: Icon,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)
        setIsFilled(!!inputRef.current?.value)
    }, [])

    return (
        <Label htmlFor={id}>
            {text}
            <Content
                isFocused={isFocused}
                isFilled={isFilled}
                isErrored={!!error}
            >
                {Icon && <Icon size={20} />}
                <input
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    ref={inputRef}
                    defaultValue={defaultValue}
                    {...rest}
                />
                {error && <AlertCircle color="#c53030" size={20} />}
            </Content>
        </Label>
    )
}

export default Input
