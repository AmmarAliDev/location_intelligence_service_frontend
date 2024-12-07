import React from 'react'

import '../styles/Modal.scss'

interface ModalProps {
  isOpen: boolean
  setOpen: any
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, setOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
