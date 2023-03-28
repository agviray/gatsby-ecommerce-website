import React, { useState, useEffect } from "react"
import FormItem from "../components/FormItem"
import Layout from "../components/Layout"
import Modal from "../components/Modal"
import {
  contactWrapper,
  container,
  heading,
  content,
  submitButton,
  messageBox,
  modalButtonContainer,
  modalButton,
} from "../styles/contact.module.css"
import {
  formContainer,
  formHeading,
  formContent,
  formItemWrapper,
  formLabel,
  formTextInput,
  formTextarea,
} from "../styles/form.module.css"
import useFormValidation from "../components/hooks/useFormValidation"

const Contact = () => {
  const [formStatus, setFormStatus] = useState({})
  const [displayModal, setDisplayModal] = useState(false)
  const { formValues, formErrors, updateFormValues, clearError, resetForm } =
    useFormValidation()

  useEffect(() => {
    if (Object.keys(formStatus).length === 0) {
      setDisplayModal(false)
    } else {
      setDisplayModal(true)
    }
  }, [formStatus])

  const sendMessage = e => {
    e.preventDefault()

    if (Object.keys(formErrors).length !== 0) {
      setFormStatus({
        hasErrors: true,
        message: `Please review your provided information, and try sending your message again.`,
      })
    } else if (Object.keys(formValues).length < 4) {
      setFormStatus({
        hasErrors: true,
        message: `Please fill in all form fields before sending your message.`,
      })
    } else if (Object.keys(formErrors).length === 0) {
      setFormStatus({
        hasErrors: false,
        message: `Your message was sent! Please check your email for future responses from us.`,
      })
    }
  }

  const closeModal = e => {
    e.preventDefault()
    if (formStatus.hasErrors === true) {
      setFormStatus({})
    } else if (formStatus.hasErrors === false) {
      resetForm()
      setFormStatus({})
    }
  }

  return (
    <div className={contactWrapper}>
      <Layout>
        <div className={container}>
          <div className={heading}>
            <h2>CONTACT</h2>
          </div>
          <div className={content}>
            <div className={formContainer}>
              <form onSubmit={e => sendMessage(e)}>
                <h3 className={formHeading}>SEND US A MESSAGE</h3>
                <div className={formContent}>
                  <div className={formItemWrapper}>
                    <FormItem
                      error={formErrors.name ? formErrors.name : null}
                      isErrorVisible={formErrors.name ? true : false}
                    >
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
                        onFocus={e => clearError(e)}
                        onBlur={e => updateFormValues(e)}
                      />
                    </FormItem>
                  </div>
                  <div className={formItemWrapper}>
                    <FormItem
                      error={formErrors.email ? formErrors.email : null}
                      isErrorVisible={formErrors.email ? true : false}
                    >
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
                        onFocus={e => clearError(e)}
                        onBlur={e => updateFormValues(e)}
                      />
                    </FormItem>
                  </div>
                  <div className={formItemWrapper}>
                    <FormItem
                      error={formErrors.phone ? formErrors.phone : null}
                      isErrorVisible={formErrors.phone ? true : false}
                    >
                      {" "}
                      <label className={formLabel} htmlFor="ContactFormPhone">
                        PHONE
                      </label>
                      <input
                        className={formTextInput}
                        type="text"
                        maxLength={10}
                        id="ContactFormPhone"
                        placeholder="PHONE"
                        name="phone"
                        value={formValues.phone ? formValues.phone : ""}
                        onChange={e => updateFormValues(e)}
                        onFocus={e => clearError(e)}
                        onBlur={e => updateFormValues(e)}
                      />
                    </FormItem>
                  </div>
                  <div className={formItemWrapper}>
                    <FormItem
                      error={formErrors.message ? formErrors.message : null}
                      isErrorVisible={formErrors.message ? true : false}
                    >
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
                        onFocus={e => clearError(e)}
                        onBlur={e => updateFormValues(e)}
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
      <Modal activeStatus={displayModal}>
        <div className={messageBox}>
          <p>{formStatus.message}</p>
          <div className={modalButtonContainer}>
            <button onClick={e => closeModal(e)} className={modalButton}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Contact
