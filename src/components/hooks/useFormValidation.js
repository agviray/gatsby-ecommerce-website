import { useState } from "react"

const useFormValidation = () => {
  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})

  const resetForm = () => {
    setFormValues({})
    setFormErrors({})
  }

  // - Validates all form values.
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
            email: "Please enter your full email address.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.email
          setFormErrors(clone)
        }
        break

      case "phone":
        if (value === "" || value.length < 10) {
          setFormErrors({
            ...formErrors,
            phone: "Please enter your 10 digit phone number, area code first.",
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

  const updateFormValues = (e, errorName, errorValue) => {
    const phoneRegExp = /^[0-9]*$/

    let name = e.target.name
    let value = e.target.value

    if (name === "phone") {
      if (!phoneRegExp.test(value)) {
        return
      }
    }
    validate(e, name, value)
    setFormValues({ ...formValues, [name]: value })
  }

  const clearError = e => {
    let name = e.target.name
    let clone = Object.assign({}, formErrors)

    if (clone[name]) {
      delete clone[name]
      setFormErrors(clone)
    }
  }

  return {
    formValues,
    formErrors,
    updateFormValues,
    clearError,
    resetForm,
  }
}

export default useFormValidation
