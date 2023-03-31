import React, { useState, useEffect } from "react"
import FormItem from "../components/FormItem"
import Layout from "../components/Layout"
import Modal from "../components/Modal"
import {
  contactWrapper,
  container,
  heading,
  content,
  buttonContainer,
  submitButton,
  messageBox,
  modalHeading,
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
  const [modalContent, setModalContent] = useState({})
  const [displayModal, setDisplayModal] = useState(false)
  const { formValues, formErrors, updateFormValues, clearError, resetForm } =
    useFormValidation()

  useEffect(() => {
    if (Object.keys(modalContent).length === 0) {
      setDisplayModal(false)
    } else {
      setDisplayModal(true)
    }
  }, [modalContent])

  const sendMessage = e => {
    e.preventDefault()

    if (Object.keys(formErrors).length !== 0) {
      setModalContent({
        formErrorsExist: true,
        heading: `OH NO!`,
        message: `Something isn't right. Please review your information.`,
      })
    } else if (Object.keys(formValues).length < 4) {
      setModalContent({
        formErrorsExist: true,
        heading: `MISSING ITEMS`,
        message: `You must complete all form fields.`,
      })
    } else if (Object.keys(formErrors).length === 0) {
      setModalContent({
        formErrorsExist: false,
        heading: `MESSAGE SENT`,
        message: `We're on it! Check your email for future responses from our team.`,
      })
    }
  }

  const closeModal = e => {
    e.preventDefault()
    if (modalContent.formErrorsExist === true) {
      setModalContent({})
    } else if (modalContent.formErrorsExist === false) {
      resetForm()
      setModalContent({})
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
                  <div className={buttonContainer}>
                    <input
                      type="button"
                      value="SEND"
                      className={submitButton}
                      onClick={e => sendMessage(e)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
      <Modal activeStatus={displayModal}>
        <div className={messageBox}>
          <h3 className={modalHeading}>{modalContent.heading}</h3>
          <p>{modalContent.message}</p>
          <button onClick={e => closeModal(e)} className={modalButton}>
            OK
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Contact
