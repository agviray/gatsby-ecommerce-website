import React, { useState, useEffect } from "react"
import {
  formItem,
  content,
  invalidField,
  errorMessage,
  errorActive,
} from "../styles/contact-form-item.module.css"

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
    <div className={formItem}>
      <div
        className={`${content} ${isItemFieldValid ? "" : `${invalidField}`}`}
      >
        {children}
      </div>
      <div
        className={`${errorMessage} ${
          isItemFieldValid ? "" : `${errorActive}`
        }`}
      >
        Please check this field.
      </div>
    </div>
  )
}

export default ContactFormItem
