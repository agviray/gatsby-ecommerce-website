import React, { useState, useEffect } from "react"
import {
  content,
  invalidField,
  errorMessage,
} from "../styles/form-item.module.css"

const FormItem = ({ children, error, isErrorVisible }) => {
  const [errorNotification, setErrorNotification] = useState(null)

  useEffect(() => {
    if (error) {
      setErrorNotification(error)
    } else {
      setErrorNotification(null)
    }
  }, [error])

  return (
    <div>
      <div className={`${content} ${isErrorVisible ? `${invalidField}` : ""}`}>
        {children}
      </div>
      {isErrorVisible ? (
        <div className={errorMessage}>{errorNotification}</div>
      ) : null}
    </div>
  )
}

export default FormItem
