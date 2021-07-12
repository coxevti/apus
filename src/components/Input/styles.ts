import styled, { css } from 'styled-components'

interface InputProps {
    isFocused: boolean
    isFilled: boolean
    isErrored: boolean
}

export const Label = styled.label`
    display: block;
    color: #acb4c4;
    font-size: 0.8rem;
    font-weight: 500;
    & + label {
        margin-top: 15px;
    }
`

export const Content = styled.div<InputProps>`
    margin-top: 15px;
    display: flex;
    align-items: center;
    background: #fff;
    border: 2px solid #ebedf0;
    border-radius: 8px;
    padding: 12px;
    ${(props) =>
        props.isFocused &&
        css`
            color: #389ff7;
            border: 2px solid #389ff7;
        `}
    ${(props) =>
        props.isFilled &&
        css`
            color: #389ff7;
        `}
    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}
  input {
        flex: 1;
        background: transparent;
        width: 100%;
        border: 0;
        color: #6c758e;
        &::placeholder {
            color: #acb4c4;
        }
    }
    svg {
        margin-right: 16px;
    }
`
