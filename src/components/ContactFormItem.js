import React, { useState, useEffect } from "react"
import { formItem, invalidField } from "../styles/contact-form-item.module.css"

const ContactFormItem = ({ children, isFieldValid }) => {
  const [isItemFieldValid, setIsItemFieldValid] = useState(true)

  useEffect(() => {
    if (isFieldValid === true) {
      setIsItemFieldValid(true)
    }

    if (isFieldValid === false) {
      setIsItemFieldValid(false)
    }
  }, [isFieldValid])

  return (
    <div className={`${formItem} ${isItemFieldValid ? "" : `${invalidField}`}`}>
      {children}
    </div>
  )
}

export default ContactFormItem
