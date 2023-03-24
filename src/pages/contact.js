import React, { useState, useEffect } from "react"
import FormItem from "../components/FormItem"
import Layout from "../components/Layout"
import {
  container,
  heading,
  content,
  formContainer,
  formHeading,
  formContent,
  formItemWrapper,
  formLabel,
  formTextInput,
  formTextarea,
  submitButton,
} from "../styles/contact.module.css"
import useFormValidation from "../components/hooks/useFormValidation"

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
  const { formValues, updateFormValues } = useFormValidation()

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

  // const updateFormData = updatedData => {
  //   setFormData(updatedData)
  // }

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
                <div className={formItemWrapper}>
                  <FormItem isFieldValid={isNameValid}>
                    <label className={formLabel} htmlFor="ContactFormName">
                      NAME
                    </label>
                    <input
                      className={formTextInput}
                      type="text"
                      id="ContactFormName"
                      placeholder="NAME"
                      name="name"
                      value={formValues.name ? formValues.name : ""}
                      onChange={e => updateFormValues(e)}
                      onFocus={() => clearError(isNameValid, setIsNameValid)}
                    />
                  </FormItem>
                </div>
                <div className={formItemWrapper}>
                  <FormItem isFieldValid={isEmailValid}>
                    <label className={formLabel} htmlFor="ContactFormEmail">
                      EMAIL
                    </label>
                    <input
                      className={formTextInput}
                      type="text"
                      id="ContactFormEmail"
                      placeholder="EMAIL"
                      name="email"
                      value={formValues.email ? formValues.email : ""}
                      onChange={e => updateFormValues(e)}
                      onFocus={() => clearError(isEmailValid, setIsEmailValid)}
                    />
                  </FormItem>
                </div>
                <div className={formItemWrapper}>
                  <FormItem isFieldValid={isPhoneValid}>
                    {" "}
                    <label className={formLabel} htmlFor="ContactFormPhone">
                      PHONE
                    </label>
                    <input
                      className={formTextInput}
                      type="text"
                      id="ContactFormPhone"
                      placeholder="PHONE"
                      name="phone"
                      value={formValues.phone ? formValues.phone : ""}
                      onChange={e => updateFormValues(e)}
                      onFocus={() => clearError(isPhoneValid, setIsPhoneValid)}
                    />
                  </FormItem>
                </div>
                <div className={formItemWrapper}>
                  <FormItem isFieldValid={isMessageValid}>
                    <label className={formLabel} htmlFor="ContactFormMessage">
                      MESSAGE
                    </label>
                    <textarea
                      className={formTextarea}
                      rows="10"
                      id="ContactFormMessage"
                      placeholder="MESSAGE"
                      name="message"
                      value={formValues.message ? formValues.message : ""}
                      onChange={e => updateFormValues(e)}
                      onFocus={() =>
                        clearError(isMessageValid, setIsMessageValid)
                      }
                    />
                  </FormItem>
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
