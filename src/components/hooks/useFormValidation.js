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

      case "address":
        if (value === "") {
          setFormErrors({
            ...formErrors,
            address:
              "Please enter your street address. (Example: 1234 Wall Street)",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.address
          setFormErrors(clone)
        }
        break

      case "city":
        if (value === "") {
          setFormErrors({
            ...formErrors,
            city: "Please enter the name of your city.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.city
          setFormErrors(clone)
        }
        break

      case "state":
        if (value === "" || value.length < 2) {
          setFormErrors({
            ...formErrors,
            state:
              "Please enter your abbreviated state. (Example: Texas written as TX)",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.state
          setFormErrors(clone)
        }
        break

      case "zipcode":
        if (value === "" || value.length < 5) {
          setFormErrors({
            ...formErrors,
            zipcode: "Please enter your 5 digit zip code.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.zipcode
          setFormErrors(clone)
        }
        break

      case "cardholder":
        if (value === "") {
          setFormErrors({
            ...formErrors,
            cardholder: "Please enter the card holder's name.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.cardholder
          setFormErrors(clone)
        }
        break

      case "cardnumber":
        if (value === "") {
          setFormErrors({
            ...formErrors,
            cardnumber: "Please enter your card number.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.cardnumber
          setFormErrors(clone)
        }
        break

      case "cardexpiry":
        if (value === "" || value.length < 4) {
          setFormErrors({
            ...formErrors,
            cardexpiry:
              "Please enter your card's expiration date in the following format: mmyy. (Example: May 2023 written as 0523)",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.cardexpiry
          setFormErrors(clone)
        }
        break

      case "cardsecuritycode":
        if (value === "") {
          setFormErrors({
            ...formErrors,
            cardsecuritycode:
              "Please enter your card's security code. This is the 3-4 digit number, usually found at the back of your card.",
          })
        } else {
          let clone = Object.assign({}, formErrors)
          delete clone.cardsecuritycode
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
    const phoneRegExp = /^[0-9]*$/
    const stateRegExp = /^[a-zA-Z]*$/

    let name = e.target.name
    let value = e.target.value

    if (
      name === "phone" ||
      name === "zipcode" ||
      name === "cardnumber" ||
      name === "cardsecuritycode" ||
      name === "cardexpiry"
    ) {
      if (!phoneRegExp.test(value)) {
        return
      }
    } else if (name === "state") {
      if (!stateRegExp.test(value)) {
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
