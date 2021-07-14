import {
    ModalBody,
    ModalContainer,
    ModalHeader,
    ModalTitle
} from 'components/Modal/styles'

import React from 'react'
import { CSSTransition } from 'react-transition-group'
import ReactDOM from 'react-dom'

interface ModalProps {
    show: boolean
    title: string
}

const root = document.getElementById('root') as HTMLElement

const Modal: React.FC<ModalProps> = ({ show, title, children }) => {
    return ReactDOM.createPortal(
        <CSSTransition in={show} timeout={{ enter: 0, exit: 300 }}>
            <ModalContainer>
                <div className="modal-content">
                    <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>{children}</ModalBody>
                </div>
            </ModalContainer>
        </CSSTransition>,
        root
    )
}

export default Modal
