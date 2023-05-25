import React, { useState, useEffect } from "react"

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
    <div className="formItem">
      <div className={`content ${isErrorVisible ? "invalid" : ""}`}>
        {children}
      </div>
      {isErrorVisible ? (
        <div className="errorMessage">{errorNotification}</div>
      ) : null}
    </div>
  )
}

export default FormItem
