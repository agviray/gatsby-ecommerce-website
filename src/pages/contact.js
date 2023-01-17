import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import {
  container,
  heading,
  content,
  formContainer,
  formHeading,
  formContent,
  formItem,
  formLabel,
  formTextInput,
  formTextarea,
  submitButton,
  invalidField,
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
                <div
                  className={`${formItem} ${
                    isNameValid ? "" : `${invalidField}`
                  }`}
                >
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
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div
                  className={`${formItem} ${
                    isEmailValid ? "" : `${invalidField}`
                  }`}
                >
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
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div
                  className={`${formItem} ${
                    isPhoneValid ? "" : `${invalidField}`
                  }`}
                >
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
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div
                  className={`${formItem} ${
                    isMessageValid ? "" : `${invalidField}`
                  }`}
                >
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
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
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
