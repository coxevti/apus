import styled from 'styled-components'

interface ButtonProps {
    width: string | null
}

export const Container = styled.button<ButtonProps>`
    width: ${(props) => props.width};
    border: 0;
    background: #389ff7;
    color: #fff;
    border-radius: 8px;
    font-weight: 500;
    padding: 12px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`
