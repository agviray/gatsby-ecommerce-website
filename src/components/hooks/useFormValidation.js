import React, { useState, useEffect } from "react"

const useFormValidation = () => {
  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  useEffect(() => {
    console.log(formErrors)
  }, [formErrors])

  const validate = (e, name, value) => {
    switch (name) {
      case "name":
        if (value === "") {
          setFormErrors({
            ...formErrors,
            name: "Please enter your first and last name.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.name
          setFormErrors(clone)
        }
        break

      case "email":
        const emailRegExp =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (value === "" || !emailRegExp.test(value)) {
          setFormErrors({
            ...formErrors,
            email: "Please enter a valid email address.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.email
          setFormErrors(clone)
        }
        break

      case "phone":
        const phoneRegExp = /^[0-9]*$/
        if (!phoneRegExp.test(value)) {
          setFormErrors({
            ...formErrors,
            phone:
              "Please enter a valid phone number. Do not include special characters such as: -_.@",
          })
        } else if (value === "" || value.length < 10) {
          setFormErrors({
            ...formErrors,
            phone: "Please enter your 10 digit phone number.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.phone
          setFormErrors(clone)
        }
        break

      case "message":
        if (value === "") {
          setFormErrors({
            ...formErrors,
            message: "Please enter your message.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.message
          setFormErrors(clone)
        }
        break

      default:
        break
    }
  }

  const updateFormValues = e => {
    let name = e.target.name
    let value = e.target.value
    validate(e, name, value)
    setFormValues({ ...formValues, [name]: value })
  }

  return { formValues, formErrors, updateFormValues }
}

export default useFormValidation
