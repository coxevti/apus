import styled, { keyframes } from 'styled-components'

const dots = keyframes`
    0%, 100%{
        transform: scale(0.2);
        background-color: #30ffb7;
    }
    40%{
        transform: scale(1);
        background-color: #07deff;
    }
    50%{
        transform: scale(1);
        background-color: #0761ff;
    }
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`

export const Circle = styled.span`
    width: 21px;
    height: 21px;
    margin: 0 5px;
    border-radius: 50%;
    display: inline-block;
    animation-name: ${dots};
    animation-duration: 2.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    &:nth-child(0) {
        animation-delay: 0s;
    }
    &:nth-child(1) {
        animation-delay: 0.2s;
    }
    &:nth-child(2) {
        animation-delay: 0.4s;
    }
    &:nth-child(3) {
        animation-delay: 0.6s;
    }
    &:nth-child(4) {
        animation-delay: 0.8s;
    }
    &:nth-child(5) {
        animation-delay: 1s;
    }
`
