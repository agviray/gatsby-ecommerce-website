import React, { useState, useEffect } from "react"
import ContactFormItem from "../components/ContactFormItem"
import Layout from "../components/Layout"
import {
  container,
  heading,
  content,
  formContainer,
  formHeading,
  formContent,
  formLabel,
  formTextInput,
  formTextarea,
  submitButton,
} from "../styles/contact.module.css"

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
}

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [isNameValid, setIsNameValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPhoneValid, setIsPhoneValid] = useState(true)
  const [isMessageValid, setIsMessageValid] = useState(true)

  const validateName = () => {
    const nameValidity = formData.name !== ""
    setIsNameValid(nameValidity)
  }
  const validateEmail = () => {
    const emailValidity = emailRegExp.test(formData.email)
    setIsEmailValid(emailValidity)
  }

  const validatePhone = () => {
    const phoneValidity = formData.phone !== ""
    setIsPhoneValid(phoneValidity)
  }

  const validateMessage = () => {
    const messageValidity = formData.message !== ""
    setIsMessageValid(messageValidity)
  }

  const sendMessage = e => {
    validateName()
    validateEmail()
    validatePhone()
    validateMessage()
    e.preventDefault()
  }

  const handleFormSubmit = e => {
    validateName()
    validateEmail()
    validatePhone()
    validateMessage()
    e.preventDefault()
  }

  const updateFormData = updatedData => {
    setFormData(updatedData)
  }

  const clearError = (currentFieldValidity, callback) => {
    if (currentFieldValidity === false) {
      callback(true)
    }
    return
  }

  return (
    <Layout>
      <div className={container}>
        <div className={heading}>
          <h2>CONTACT</h2>
        </div>
        <div className={content}>
          <div className={formContainer}>
            <form onSubmit={e => handleFormSubmit(e)}>
              <h3 className={formHeading}>SEND US A MESSAGE</h3>
              <div className={formContent}>
                <ContactFormItem isFieldValid={isNameValid}>
                  <label className={formLabel} htmlFor="ContactFormName">
                    NAME
                  </label>
                  <input
                    className={formTextInput}
                    type="text"
                    id="ContactFormName"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={e =>
                      updateFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => clearError(isNameValid, setIsNameValid)}
                  />
                </ContactFormItem>
                <ContactFormItem isFieldValid={isEmailValid}>
                  <label className={formLabel} htmlFor="ContactFormEmail">
                    EMAIL
                  </label>
                  <input
                    className={formTextInput}
                    type="text"
                    id="ContactFormEmail"
                    placeholder="EMAIL"
                    value={formData.email}
                    onChange={e =>
                      updateFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => clearError(isEmailValid, setIsEmailValid)}
                  />
                </ContactFormItem>
                <ContactFormItem isFieldValid={isPhoneValid}>
                  {" "}
                  <label className={formLabel} htmlFor="ContactFormPhone">
                    PHONE
                  </label>
                  <input
                    className={formTextInput}
                    type="text"
                    id="ContactFormPhone"
                    placeholder="PHONE"
                    value={formData.phone}
                    onChange={e =>
                      updateFormData({ ...formData, phone: e.target.value })
                    }
                    onFocus={() => clearError(isPhoneValid, setIsPhoneValid)}
                  />
                </ContactFormItem>
                <ContactFormItem isFieldValid={isMessageValid}>
                  <label className={formLabel} htmlFor="ContactFormMessage">
                    MESSAGE
                  </label>
                  <textarea
                    className={formTextarea}
                    rows="10"
                    id="ContactFormMessage"
                    placeholder="MESSAGE"
                    value={formData.message}
                    onChange={e =>
                      updateFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() =>
                      clearError(isMessageValid, setIsMessageValid)
                    }
                  />
                </ContactFormItem>
                <input
                  type="submit"
                  value="SEND"
                  className={submitButton}
                  onClick={e => sendMessage(e)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
