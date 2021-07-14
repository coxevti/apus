import styled from 'styled-components'

export const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
    z-index: 1;
    &.enter-done {
        opacity: 1;
        pointer-events: visible;
        .modal-content {
            transform: translateY(0);
        }
    }
    &.exit {
        opacity: 0;
        .modal-content {
            transform: translateY(-200px);
        }
    }
    .modal-content {
        width: 500px;
        background-color: #fff;
        transition: all 0.3s ease-in-out;
        transform: translateY(-200px);
    }
`

export const ModalHeader = styled.div`
    padding: 20px;
`

export const ModalTitle = styled.h4`
    margin: 0;
`

export const ModalBody = styled.div`
    padding: 20px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
`

export const ModalFooter = styled.div`
    padding: 20px;
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
