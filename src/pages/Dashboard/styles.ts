import styled, { css } from 'styled-components'

interface InputProps {
    isFocused: boolean
}

interface GroupInputProp {
    marginBottom?: string
}

export const Wrapper = styled.div`
    flex: 1;
    padding: 2rem 4rem;
`

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
        border-radius: 25px;
        svg {
            margin-right: 5px;
        }
    }
`

export const LoadingContent = styled.div`
    display: flex;
    padding: 2rem;
    margin-top: 5rem;
`

export const ContentInput = styled.div<InputProps>`
    margin-top: 3rem;
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
`

export const Input = styled.input`
    flex: 1;
    background: transparent;
    width: 100%;
    border: 0;
    color: #6c758e;
    &::placeholder {
        color: #acb4c4;
    }
`

export const ActionForm = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    .btn-submit {
        padding: 10px 20px;
        border-radius: 0;
        margin-right: 5px;
        &:hover {
            background: #fff;
            color: #389ff7;
            border: 1px solid #389ff7;
        }
    }
    .btn-close {
        color: #888888;
        background: #ececec;
        border: 1px solid #ececec;
        padding: 10px 20px;
        border-radius: 0;
        &:hover {
            border: 1px solid #888888;
        }
    }
`

export const GroupInput = styled.div<GroupInputProp>`
    display: flex;
    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom : '0px'};
    label {
        margin-top: 15px;
        & + label {
            margin-left: 15px;
        }
    }
`

export const LoadingContentModal = styled.div`
    position: absolute;
    top: 50%;
    left: 11%;
`

export const ContainerTable = styled.div`
    height: calc(100vh - 13rem);
`
