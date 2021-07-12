import SignInBackground from 'assets/sign-in-background.svg'
import { shade } from 'polished'
import styled, { keyframes } from 'styled-components'

const appearFromLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(-50px);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: stretch;
    background: #f8fafb;
    padding: 20px;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;
    div {
        h1 {
            font-family: 'Titillium Web', sans-serif;
            font-size: 4em;
            font-weight: 600;
            color: #1d94ee;
            text-align: center;
        }
        h2 {
            margin-top: 10px;
            font-family: 'Titillium Web', sans-serif;
            font-size: 1.6em;
            font-weight: 600;
            opacity: 0.3;
            text-align: center;
        }
    }
    form {
        margin-top: 60px;
        width: 100%;
        max-width: 370px;
        button {
            margin-top: 16px;
        }
        > div {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            color: #389ff7;
            font-weight: 500;
            span {
                opacity: 0.4;
                font-size: 0.8rem;
            }
            a {
                text-decoration: none;
                color: #389ff7;
                transition: color 0.2s;
                &:hover {
                    color: ${shade(0.2, '#389FF7')};
                }
            }
        }
    }
`

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: ${appearFromLeft} 1s;
`

export const Background = styled.div`
    flex: 1;
    background: url(${SignInBackground}) no-repeat center;
    background-size: contain;
`
