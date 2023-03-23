import React, { useState, useEffect } from "react"
import {
  content,
  invalidField,
  errorMessage,
  errorActive,
} from "../styles/form-item.module.css"

const FormItem = ({ children, isFieldValid }) => {
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
    <div>
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

export default FormItem
