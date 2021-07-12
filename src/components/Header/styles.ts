import styled from 'styled-components'

export const Container = styled.div`
    background: #fefefe;
    border-bottom: 1px solid #edeef3;
`

export const Content = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > h1 {
        font-family: 'Titillium Web', sans-serif;
        font-size: 3.2em;
        font-weight: 600;
        color: #1d94ee;
        padding: 5px 25px 20px 25px;
    }
    aside {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        button {
            background: transparent;
            display: flex;
            justify-content: center;
            border: 0;
            color: #b2b7d2;
            padding: 25px;
            &:hover {
                color: #1b1b3d;
            }
        }
    }
`

export const Profile = styled.div`
    text-align: center;
    font-weight: normal;
    color: #a9b2c8;
    display: flex;
    align-items: center;
    padding: 0px 25px;
    img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 10px;
    }
`

export const Separation = styled.div`
    border-left: 1px solid #edeef3;
    height: 78px;
`
