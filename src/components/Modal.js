import React from "react"

const Modal = ({ children, activeStatus }) => {
  return (
    <div className={`modal ${activeStatus ? "active" : ""}`}>
      <div className="content">{children}</div>
    </div>
  )
}

export default Modal
