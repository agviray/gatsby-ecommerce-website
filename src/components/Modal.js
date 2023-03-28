import React from "react"
import { modal, content, isActive } from "../styles/modal.module.css"

const Modal = ({ children, activeStatus }) => {
  return (
    <div className={`${modal} ${activeStatus ? `${isActive}` : ""}`}>
      <div className={content}>{children}</div>
    </div>
  )
}

export default Modal
